# 🎭 Playwright + TypeScript Quickstart Guide

This short guide shows how to install **Playwright**, generate your first test using **Codegen** and run it.

---

## 1. ✅ Install Playwright
#### Requirements:
- Node.js
- Visual Studio Code (optional)

#### In a new or existing project, open your terminal and run:

```bash
npm init playwright@latest
```

Or if you are using Visual Studio Code, you can download the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension.

When prompted:
- Select TypeScript
- Accept the default test folder (e.g., `tests`)
- Choose to install the recommended browsers (Chromium, Firefox, WebKit)
- (Optional) Accept HTML report and GitHub Actions CI setup

This command scaffolds your project with:
- `playwright.config.ts`
- Example tests in `tests/` folder
- Browser binaries installed locally

Note: Playwright officially supports Windows, macOS, Debian, and Ubuntu.
If you're using a different operating system, you may need to manually install additional dependencies. The Playwright initializer will guide you by listing any missing libraries.
Alternatively, you can comment out the Webkit related lines in `playwright.config.ts`.
```
/* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ]
```

---

## 2. 🎥 Generate a Test Using Codegen

To record browser actions and generate test code automatically:

```
npx playwright codegen https://example.com
```

This will:
- Launch a browser and the Playwright Inspector
- Record every click, input, and navigation as code
- Display the generated TypeScript code in real time
- Allow you to copy and use the code when done

---

## 3. ✍️ Create and Save the Test
You can then paste the generated code to a file inside the `tests/` directory, with a **.spec.ts** or **.test.ts** extension.

For example ```tests/example.spec.ts```:

```
import { test, expect } from '@playwright/test';

test('recorded user journey', async ({ page }) => {
  await page.goto('https://example.com');
  // More actions recorded by Codegen...
});
```

---

## 4. ▶️ Run the Test

Use the following commands to run your test suite:

```
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/example.spec.ts

# Run with the UI test explorer (great for debugging)
npx playwright test --ui

# Run with visible browser window
npx playwright test --headed

# Enable trace recording for debugging
npx playwright test --trace on
```
