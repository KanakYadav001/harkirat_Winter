import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function evaluateResults(userTask, searchResults) {
  if (!searchResults.length) {
    return [];
  }

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You rank web search results by relevance to the user's task.

Return only a valid JSON object with this structure:
{
  "results": [
    {
      "title": "string",
      "url": "string",
      "reason": "string"
    }
  ]
}

Rules:
- Rank the most relevant results first.
- Use only results supplied in the input.
- Do not invent titles or URLs.
- Return at most 3 results.`,
      },
      {
        role: "user",
        content: JSON.stringify({
          task: userTask,
          candidates: searchResults,
        }),
      },
    ],
    response_format: {
      type: "json_object",
    },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Evaluator returned an empty response.");
  }

  const parsed = JSON.parse(content);
  const allowedUrls = new Set(searchResults.map((item) => item.url));

  // Never accept URLs that were not actually extracted.
  return (parsed.results ?? [])
    .filter((item) => allowedUrls.has(item.url))
    .slice(0, 3);

}


