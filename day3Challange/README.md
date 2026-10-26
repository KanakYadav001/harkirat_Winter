# Browser / Computer-Use Agent

An AI-powered browser agent built with **Node.js**, **Playwright**, and
an LLM. It accepts a task in natural language, uses registered tools to
search the web and inspect pages, evaluates the collected results, and
returns a final response.

> **Assignment track:** Build an AI agent capable of interacting with
> websites and completing tasks autonomously.

## Example task

> Find the three cheapest laptops under ₹80,000 that have 16GB RAM.

The agent should search for relevant pages, inspect information, compare
results against the requirements, and return findings with source links.
Important prices and specifications should be verified from source pages
because search snippets may be incomplete or outdated.

## Project structure

``` text
day3Challan/
├── node_modules/
├── src/
│   ├── agent.js
│   ├── browser.js
│   ├── evaluator.js
│   └── tools.js
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

## File responsibilities

  -----------------------------------------------------------------------
  File                                Responsibility
  ----------------------------------- -----------------------------------
  `src/agent.js`                      Main entry point. Reads the user's
                                      task, calls the model, executes
                                      tool calls, manages the agent loop,
                                      and prints the final answer.

  `src/browser.js`                    Uses Playwright to open web pages
                                      and collect page information.

  `src/evaluator.js`                  Evaluates and ranks search results
                                      against the user's task and
                                      constraints.

  `src/tools.js`                      Defines the tools available to the
                                      model and validates their inputs.

  `.env`                              Stores secret environment
                                      variables, such as the model API
                                      key. Keep it private.

  `.env.example`                      Documents required environment
                                      variable names using placeholder
                                      values.

  `package.json`                      Contains project metadata,
                                      dependencies, and optional npm
                                      scripts.

  `playwright.config.js`              Optional configuration for
                                      Playwright tests.

  `README.md`                         Project documentation and setup
                                      instructions.
  -----------------------------------------------------------------------

## Requirements

-   Node.js and npm.
-   A supported LLM API key (for example, Groq if configured in
    `src/agent.js`).
-   Playwright installed in the project.
-   Internet access.
-   A supported browser. If the code uses a hard-coded Brave
    `executablePath`, Brave must be installed at that exact path. For
    portability, consider Playwright-managed Chromium.
-   A terminal and a code editor such as Visual Studio Code.

## Setup

### 1. Install dependencies

Run these commands from the project root (the folder containing
`package.json`):

``` bash
npm install
```

If Playwright is not already installed:

``` bash
npm install playwright
```

If you use Playwright-managed Chromium:

``` bash
npx playwright install chromium
```

If your code intentionally launches Brave using `executablePath`, check
that the path is correct for your computer.

### 2. Configure environment variables

Create or update `.env` in the project root:

``` env
GROQ_API_KEY=your_groq_api_key_here
```

Use the exact variable name expected by your code. Never publish a real
API key in source files, documentation, screenshots, or Git commits.

Keep `.env` in `.gitignore`. Your `.env.example` should contain only a
placeholder:

``` env
GROQ_API_KEY=replace_with_your_api_key
```

### 3. Run the agent

From the project root:

``` bash
node src/agent.js
```

Enter a task when prompted, for example:

``` text
Find three laptops under ₹80,000 with 16GB RAM and compare them.
```

The exact prompt and output depend on the implementation in
`src/agent.js`.

## How it works

1.  **Understand the task:** the model interprets the request and
    constraints.
2.  **Plan actions:** the model selects an available tool, such as web
    search or opening a URL.
3.  **Search:** the browser tool opens a search page and collects
    candidate links.
4.  **Inspect pages:** the agent can open selected URLs and extract
    visible page text.
5.  **Evaluate results:** the evaluator ranks candidate results for
    relevance.
6.  **Continue or stop:** the agent runs a bounded tool-call loop and
    stops when it can provide an answer or reaches its limit.
7.  **Return findings:** the final response should include relevant
    details, source URLs, and uncertainty where information could not be
    verified.

## Available tools

Tool names must match the names registered in the code. The project may
provide:

-   `search_web` --- searches for information and returns candidate
    results.
-   `open_url` --- opens a web page and extracts visible text.
-   `evaluate_results` --- ranks candidate results against the user's
    task.

The model should call only registered tools. Tool schemas should
validate inputs, and unknown tool names should be handled without
crashing.

## Current scope and limitations

This is a beginner-level prototype, not a general-purpose computer-use
system.

-   Search extraction may include irrelevant links. Filtering actual
    search-result elements and collecting snippets can improve quality.
-   Websites can change layouts, block automation, require login, or
    load content dynamically.
-   A search snippet does not prove a price or specification is correct.
    Open the source page to verify important fields.
-   Prices and availability can change; state uncertainty where
    relevant.
-   Complex actions such as checkout, account creation, file uploads, or
    multi-step forms may not be supported.
-   The model can make mistakes. Validate results and never let
    model-generated instructions run arbitrary local commands.
-   A hard-coded browser path is specific to one computer and should
    eventually be configurable.

## Recommended improvements

Build these features incrementally:

1.  **Better search extraction:** collect title, URL, and snippet from
    actual result elements; remove duplicate and navigation links.
2.  **Structured extraction:** return consistent fields such as `name`,
    `price`, `specifications`, `availability`, and `sourceUrl`.
3.  **Constraint validation:** check each result against the user's
    budget and required specifications.
4.  **Bounded agent loop:** cap tool calls, retries, and total runtime;
    produce a final answer when the limit is reached.
5.  **Error handling:** handle timeouts, navigation failures, empty
    results, and invalid tool arguments.
6.  **Source-based answers:** show the source for each result and flag
    fields that could not be verified.
7.  **Tests:** test result filtering, evaluator behavior, tool schemas,
    and browser failures.
8.  **Configuration:** move browser paths and limits into environment
    variables or a configuration file.
9.  **Logging:** record tool/action summaries without exposing API keys
    or unnecessary personal data.
10. **Optional browser-agent framework:** after the basic flow works,
    explore Stagehand or another framework for complex page
    interactions.

## Security and responsible use

-   Never commit `.env` or expose API keys.
-   Do not execute arbitrary commands generated by the model.
-   Restrict the agent to an explicit list of tools and validate every
    tool input.
-   Use timeouts and limits to avoid runaway loops or excessive
    requests.
-   Respect website terms, access controls, and rate limits. Do not
    attempt to bypass CAPTCHAs, logins, or other security controls.
-   Require human confirmation before consequential actions such as
    purchases, submissions, or deleting data.

## Troubleshooting

### API key missing or authentication fails

Check that `.env` is in the project root, the variable name matches the
code, and the key is valid. Restart the process after changing
environment variables.

### Playwright cannot launch Brave

Check the `executablePath` and confirm Brave is installed at that
location. Alternatively, use Playwright-managed Chromium and run
`npx playwright install chromium`.

### The agent searches but never returns a final answer

Check that the agent loop appends each AI response to the conversation,
executes registered tool calls, appends a tool result with the matching
`tool_call_id`, and repeats until the model responds without tool calls.
Add a maximum tool-call count and a final-answer fallback.

### Results are irrelevant or missing product details

Improve search selectors, open promising source pages, extract
structured details, and validate each result against the user's
requirements. A result's position or snippet does not guarantee
accuracy.

## Future goal

The long-term goal is to evolve this prototype into an agent that can
plan a task, navigate pages, interact with supported UI elements,
collect evidence, make constrained decisions, and produce a traceable
final report. Implement each capability incrementally and test it before
adding more autonomy.
