import dotenv from "dotenv";
import promptSync from "prompt-sync";
import { ChatGroq } from "@langchain/groq";
import { searchWebs, evaluateResult, openUrl } from "./tools.js";



dotenv.config();



const tools = [searchWebs, evaluateResult , openUrl];

const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GROQ_API_KEY,
});

const agent = llm.bindTools(tools);

const userInput = promptSync()("Enter your message: ");


async function llmCall(userInput) {
  const message = [
    {
      role: "system",
      content: `You are an autonomous web research agent.
Use search_web to find results.
Use open_url to read relevant webpages when needed.
Use evaluate_results to rank actual search results.
Never invent prices, product details, or URLs.
After at most 2 searches, provide a final answer.
Use only the tools available to you.`,
    },
    { role: "user", content: userInput },
  ];

  let searchCount = 0;
  const MAX_SEARCHES = 2;

  try {
    for (let i = 0; i < 6; i++) {
      // Force a final answer after 2 searches.
      if (searchCount >= MAX_SEARCHES) {


        const finalResponse = await llm.invoke([
          ...message,
          {
            role: "system",
            content:
              "Do not call tools. Give the final answer using the results already collected. Never invent facts.",
          },
        ]);

        console.log("\nFinal answer:\n", finalResponse.content);
        return;
      }

      const aiMsg = await agent.invoke(message);

      // Important: preserve the assistant's tool-call message.
      message.push(aiMsg);

      if (!aiMsg.tool_calls?.length) {
        console.log("\nFinal answer:\n", aiMsg.content);
        return;
      }

      for (const toolCall of aiMsg.tool_calls) {
        const selectedTool = tools.find(
          (item) => item.name === toolCall.name
        );

        let output;

        if (!selectedTool) {
          output = { error: `Unknown tool: ${toolCall.name}` };
        } else {
          try {
            if (toolCall.name === "search_web") {
              if (searchCount >= MAX_SEARCHES) {
                output = {
                  message: "Search limit reached. Use existing results.",
                };
              } else {
                searchCount++;
                output = await selectedTool.invoke(toolCall.args);
              }
            } else {
              output = await selectedTool.invoke(toolCall.args);
            }
          } catch (error) {
            output = { error: error.message };
          }
        }

        message.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(output),
        });
      }
    }

    // Fallback if the agent uses all 6 steps.
    const finalResponse = await llm.invoke([
      ...message,
      {
        role: "system",
        content:
          "Stop using tools and provide your final answer from the available results.",
      },
    ]);

    console.log("\nFinal answer:\n", finalResponse.content);
  } catch (error) {
    console.error("Agent error:", error.message);
  }
}

llmCall(userInput);


