import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3001";
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL,
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || (existsSync(chrome) ? chrome : undefined),
      args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
    },
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run start -- --port 3001",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
