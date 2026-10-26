import { searchWeb } from "./browser.js";
import { evaluateResults } from "./evaluator.js";
import * as z from "zod";
import { tool } from "langchain";
import { chromium } from "playwright";

const searchWebs = tool(
  async ({ query, limit }) => {
    return await searchWeb(query, limit);
  },

  {
    name: "search_web",
    description: "Search the web and return real search results.",
    schema: z.object({
      query: z.string().describe("Search terms to look for"),
      limit: z.number().int().min(1).max(10),
    }),
  },
);
const openUrl = tool(
  async ({ url }) => {
    const browser = await chromium.launch({
      headless: true,
      executablePath:
        "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    });

    try {
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });

      return {
        url: page.url(),
        title: await page.title(),
        content: (await page.locator("body").innerText()).slice(0, 10000),
      };
    } finally {
      await browser.close();
    }
  },
  {
    name: "open_url",
    description: "Open a webpage URL and extract its visible text.",
    schema: z.object({
      url: z.string().url(),
    }),
  }
);

const evaluateResult = tool(
  async ({ userInput, searchResults }) => {
    return await evaluateResults(userInput, searchResults);
  },
  {
    name: "evaluate_results",
    description: "Rank real search results by relevance to the user's task.",
    schema: z.object({
      userInput: z.string(),
      searchResults: z.array(
        z.object({
          title: z.string(),
          url: z.string(),
          snippet: z.string().nullable().optional(),
        }),
      ),
    }),
  },
);


export { searchWebs, evaluateResult, openUrl };