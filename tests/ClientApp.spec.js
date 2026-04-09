const { test, expect } = require("@playwright/test");

test.only("Client App Login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = page.locator("#userEmail");
  const paswrd = page.locator("#userPassword");
  const productName = "Banarsi Saree";
  const emailID = "ssanaayesha786@gmail.com";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/");
  await email.fill(emailID);
  await paswrd.fill("Iamking@000");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  console.log(count);

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('Banarsi Saree')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*=Select]").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const countOption = await dropdown.locator("button[type='button']").count();

  for (let i = 0; i < countOption; i++) {
    const text = await dropdown
      .locator("button[type='button']")
      .nth(i)
      .textContent();
    if (text === " India") {
      await dropdown.locator("button[type='button']").nth(i).click();
      break;
    }
  }
  await expect(page.locator("label[type*='text']")).toHaveText(emailID);
  await page.locator("text=Place Order").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderID = await page.locator("td label.ng-star-inserted").textContent();
  console.log(orderID);
  await page.locator("button[routerlink*=myorders]").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOderID = await rows.nth(i).locator("th").textContent();
    console.log("testttttttt------------" + rowOderID);

    if (orderID.includes(rowOderID)) {
      console.log(rowOderID);
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  //await page.locator(".col-text").waitFor();
  const orderIDdetails = await page.locator("div.col-text").textContent();
  expect(orderID.includes(orderIDdetails)).toBeTruthy();

  //await page.pause();
});

test("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const blinkDocument = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(blinkDocument).toHaveAttribute("class", "blinkingText");

  //await page.pause();
});
test("Child Window handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const blinkDocument = page.locator("[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkDocument.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await username.fill(domain);
  console.log(await username.textContent());
  await page.pause();
});
