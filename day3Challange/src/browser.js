
import { chromium } from "playwright";

export async function searchWeb(searchQuery, resultCount = 3) {
  const browser = await chromium.launch({
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    headless: false
  });

  try {
    const page = await browser.newPage();

    const url = `https://search.brave.com/search?q=${encodeURIComponent(searchQuery)}`;

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });

    console.log("Brave opened:", await page.title());
    console.log("Search page:", page.url());

    // Inspect the page before writing extraction selectors.
    await page.waitForTimeout(6000);


 const links = await page.locator("a[href]").evaluateAll((elements) =>
      elements
        .map((link) => ({
          title: link.innerText.trim(),
          url: link.href
        }))
        .filter((item) =>
          item.title.length > 0 &&
          item.url.startsWith("http") &&
          !item.url.includes("search.brave.com")
        )
    );

    // Remove duplicate URLs and limit the result count.
    const uniqueResults = [
      ...new Map(links.map((item) => [item.url, item])).values()
    ];

    const results = uniqueResults.slice(
      0,
      Math.max(1, Math.min(Number(resultCount) || 3, 10))
    );

    // Next, extract real search results from the page.
    return results;
  } finally {
    await browser.close();
  }
}

export default searchWeb;