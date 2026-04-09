class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderdIdDetails = page.locator("div.col-text");
    this.orderLink = page.locator("button[routerlink*=myorders]");
    this.orderID = page.locator("td label.ng-star-inserted");
  }
  async searchOrderAndSelect(orderId) {
    const ordid = await this.getOrderId();

    const editOrderID = await ordid.replaceAll("|", "");
    const finalOrderID = editOrderID.trim();
    console.log(finalOrderID);

    await this.orderLink.click();
    await this.page.pause();
    await this.ordersTable.waitFor();
    for (let i = 0; i < (await this.rows.count()); ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      console.log("reeeeee------------" + rowOrderId);
      if (finalOrderID === rowOrderId) {
        console.log("in if cond");
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async getOrderId() {
    return await this.orderID.textContent();
  }
}
module.exports = { OrdersHistoryPage };
