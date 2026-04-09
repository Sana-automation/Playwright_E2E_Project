const { test, expect } = require("@playwright/test");

test("calender", async ({ page }) => {
  const monthName = "7";
  const date = "26";
  const year = "2027";
  const expectedList = [monthName, date, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthName) - 1)
    .click();
  await page.locator("//abbr[text()='" + date + "']").click();
  const inputs = page.locator(".react-date-picker__inputGroup input");
  for (const index = 0; index < inputs.length; index++) {
    const value = inputs[index].getAttribute("value");
    expect(value).toEqual(expectedList[index]);
  }
});
