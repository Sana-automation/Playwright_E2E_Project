const { test, expect } = require("@playwright/test");

class MyCartPage {
  constructor(page) {
    this.page = page;
    this.checkout = page.locator("text=Checkout");
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async VerifyProductIsDisplayed() {
    await this.cartProducts.waitFor();
    const bool = await this.productText.isVisible();
    expect(bool).toBeTruthy();
  }

  async Checkout() {
    await this.checkout.click();
  }
  getProductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}
module.exports = { MyCartPage };
