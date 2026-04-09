// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "off",
        trace: "off", //off-on-retain-on-failure
        ...devices["iPhone 11"],
        //trace: "on-first-retry",
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "on",
        ignoreHTTPSErrors: true,
        video: "retain-on-failure",
        permissions: ["geolocation"],
        trace: "on", //off-on-retain-on-failure
        //viewport: { width: 720, height: 720 },
        //trace: "on-first-retry",
      },
    },
  ],

  /* Configure projects for major browsers */
});
