# Playwright Automation Project

## 📌 Description

This project contains automated test scripts built using Playwright for end-to-end testing of e-commerce applications.

## 🛠️ Tools & Technologies

- Playwright
- JavaScript
- Node.js

## 📂 Project Structure

- pages/ -> Contains Page Object classes (LoginPage, DashBoardPage, MyCartPage, OrderShippingPage, OrderHistoryPage)
- tests/ → Test scripts
- playwright.config.js → Configuration file

## ▶️ How to Run

1. Install dependencies:
   npm install

2. Run tests:
   npx playwright test

## ✅ Features

- Automated UI testing
- Cross-browser testing
- Reliable test execution

## Framework Design - Page Object Model (POM)

This project follows the Page Object Model (POM) design pattern to improve test maintability, reusability, and readability.

- Each web page is represented as a seperate class
- Page elements (locators) and actions are defined with in the page classes
- Test scripts interact with these page classes instead of directly using locators

## Benefits:

- Reduces code duplication
- Improve readability and structure
- Easier maintenance when UI changes
- Better seperation of test logic and page logic

## 📚 What I Learned

- Used Page Object Model for framework design.
- Writing automation scripts using Playwright
- Handling locators and assertions
- Improving test stability and debugging issues
