const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./loginPage");
const { MyCartPage } = require("./MyCartPage");
const { OrdersShippingPage } = require("./OrdersShippingPage");
const { OrdersHistoryPage } = require("./OrdersHistoryPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new MyCartPage(this.page);
    this.ordersShippingPage = new OrdersShippingPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashBoardPage() {
    return this.dashboardPage;
  }
  getMyCartPage() {
    return this.cartPage;
  }
  getOrdersShippingPage() {
    return this.ordersShippingPage;
  }
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }
}
module.exports = { POManager };
