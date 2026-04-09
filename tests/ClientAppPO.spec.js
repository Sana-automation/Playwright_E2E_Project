const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("./utils/placeorderTestData.json"))
);
const { customtest } = require("./utils/test-base");
for (const data of dataSet) {
  test(`Client App Login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    //const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);
    //await page.locator("#login").click();
    const dashboardPage = poManager.getDashBoardPage();
    const myCartPage = poManager.getMyCartPage();
    const ordersShippingPage = poManager.getOrdersShippingPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await dashboardPage.searchProductAndaddTocart(data.productName);
    await dashboardPage.navigateToCart();
    await myCartPage.Checkout();
    await ordersShippingPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersShippingPage.SubmitAndGetOrderId();

    // await page.pause();
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy;
    await ordersHistoryPage.searchOrderAndSelect();

    //await page.pause();
  });
}
customtest.only(`Client App Login`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);

  //const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );
  //await page.locator("#login").click();
  const dashboardPage = poManager.getDashBoardPage();
  const myCartPage = poManager.getMyCartPage();
  const ordersShippingPage = poManager.getOrdersShippingPage();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await dashboardPage.searchProductAndaddTocart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  await myCartPage.Checkout();
  await ordersShippingPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersShippingPage.SubmitAndGetOrderId();

  // await page.pause();
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy;
  await ordersHistoryPage.searchOrderAndSelect();
});

// test("Browser Context Playwright test", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   const username = page.locator("#username");
//   const signIn = page.locator("#signInBtn");
//   const blinkDocument = page.locator("[href*='documents-request']");
//   const dropdown = page.locator("select.form-control");
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   await dropdown.selectOption("consult");
//   await page.locator(".radiotextsty").last().click();
//   await page.locator("#okayBtn").click();
//   console.log(await page.locator(".radiotextsty").last().isChecked());
//   await expect(page.locator(".radiotextsty").last()).toBeChecked();
//   await page.locator("#terms").click();
//   await expect(page.locator("#terms")).toBeChecked();
//   await page.locator("#terms").uncheck();
//   expect(await page.locator("#terms").isChecked()).toBeFalsy();
//   await expect(blinkDocument).toHaveAttribute("class", "blinkingText");

//   //await page.pause();
// });
// test("Child Window handle", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   const username = page.locator("#username");
//   const blinkDocument = page.locator("[href*='documents-request']");
//   const [newPage] = await Promise.all([
//     context.waitForEvent("page"),
//     blinkDocument.click(),
//   ]);
//   const text = await newPage.locator(".red").textContent();
//   console.log(text);
//   const arrayText = text.split("@");
//   const domain = arrayText[1].split(" ")[0];
//   console.log(domain);
//   await username.fill(domain);
//   console.log(await username.textContent());
//   await page.pause();
// });
