const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await username.fill("Sana");
  await page.locator("#password").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await signIn.click();
  //console.log(await page.locator(".card-body a").first().textContent());
  //console.log(await page.locator(".card-body a").nth(1).textContent());
  await page.locator(".card-body a").first().waitFor();
  console.log(await page.locator(".card-body a").allTextContents());
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
