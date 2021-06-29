/// <reference types="Cypress" />

describe("newsletter signup", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000?mailchimpId=1234");
  });
  it("Marketing Cloud success response", function () {
    cy.intercept("**/subscribe", { fixture: "marketingcloud-success.json" });
    cy.get("[type=email]").type("test@example.com");
    cy.contains("Sign Up").click();
    cy.get(".SignupForm__message").contains("Email successfully added");
  });
  it("Marketing Cloud failure response", function () {
    cy.intercept("**/subscribe", { fixture: "marketingcloud-failure.json" });
    cy.get("[type=email]").type("test@example.com");
    cy.contains("Sign Up").click();
    cy.get(".SignupForm__message").contains("User could not be subscribed");
  });
  it("Mailchimp via Marketing Cloud success response", function () {
    cy.intercept("**/subscribe", { fixture: "mailchimp-success.json" });
    cy.get("[type=email]").type("test@example.com");
    cy.contains("Sign Up").click();
    cy.get(".SignupForm__message").contains("Email successfully added");
  });
  it("Mailchimp via Marketing Cloud failure response", function () {
    cy.intercept("**/subscribe", { fixture: "mailchimp-failure.json" });
    cy.get("[type=email]").type("test@example.com");
    cy.contains("Sign Up").click();
    cy.get(".SignupForm__message").contains(
      "test@example.com looks fake or invalid, please enter a real email address."
    );
  });
});