const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "ssanaayesha786@gmail.com",
    password: "Iamking@000",
    productName: "Banarsi Saree",
  },
});
