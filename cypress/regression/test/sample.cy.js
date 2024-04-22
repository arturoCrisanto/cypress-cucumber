const { Given } = require("@badeball/cypress-cucumber-preprocessor");

Given("I am on the login page", () => {
  cy.visit("https://www.youtube.com");
});
