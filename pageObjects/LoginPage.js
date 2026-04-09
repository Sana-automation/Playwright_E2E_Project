class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInBtn = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }
  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }
  async validLogin(userName, password) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInBtn.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
