# 🎭 Playwright + TypeScript Quickstart Guide

This short guide shows how to install Playwright, generate your first test using **Codegen**, and run it.

---

## 1. ✅ Install Playwright
#### Requirements:
- Node.js
- Visual Studio Code (optional)

#### In a new or existing project, open your terminal and run:

```bash
npm init playwright@latest
```

Or if you are using Visual Studio Code, you can download the official playwright plugin.

When prompted:
- Select TypeScript
- Accept the default test folder (e.g., tests)
- Choose to install the recommended browsers (Chromium, Firefox, WebKit)
- (Optional) Accept HTML report and GitHub Actions CI setup

This creates:
- playwright.config.ts
- Example tests in tests/
- Browser binaries installed locally

---

## 2. 🎥 Generate a Test Using Codegen

To automatically generate a test script based on browser actions:

```
npx playwright codegen https://example.com
```

This will:
- Open a browser + Playwright Inspector
- Record every click, input, and navigation as code
- Display the code in the Inspector in real time
- Let you copy the generated code when finished

---

## 3. ✍️ Create and Save the Test
You can then paste the generated code to a file inside the /tests directory, with the **.specs.ts** or **.test.ts** extension.
