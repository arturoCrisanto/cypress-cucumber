# Cypress with Cucumber (BDD)

## Prerequisites:
* Node.js and npm (or yarn) installed on your system. You can verify their installation by running `node -v` and `npm -v` (or `yarn -v`) in your terminal.

## Installation
To set up Cypress with Cucumber for Behavior-Driven Development (BDD), follow these steps:

```bash
npm install cypress --save-dev
```

## 2. Install Cypress Cucumber Preprocessor

```bash
npm i @badeball/cypress-cucumber-preprocessor
```
## 3. Install ESBuild Preprocessor for Cypress
```bash
npm i @bahmutov/cypress-esbuild-preprocessor
```

## 4. Configure Cypress
Modify the `cypress.config.js` file as follows:

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: ["**/*.{feature,cy.js}"],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      return config;
    },
  },
});
```
* You can also add the `baseUrl` property to your configuration:
```Javascript
    baseUrl: "http://localhost:3000",
```

## 5.(Optional) Enable Cypress Studio
If you want to add Cypress Studio, include the following line in your `cypress.config.js` file within the e2e section:

```javascript
experimentalStudio: true,
```
## 6. Update package.json
Update your package.json file with the required dependencies:

```javascript
{
  "dependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^20.0.3",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0"
  },
  "devDependencies": {
    "cypress": "^13.7.3",
  }
}
```
## 7. Configure Cucumber Preprocessor
Create a `.cypress-cucumber-preprocessorrc.json` file in the root directory and paste the following configuration:

```json
{
    "stepDefinitions": [
        "cypress/regression/[filepath]/**/*.cy.js",
        "cypress/regression/[filepath].cy.js",
        "cypress/regression/[filepart]/common.cy.js",
        "cypress/regression/common/*.cy.js"
        
    ]
}
```
## 8. Adjust File System Structure
Organize your file system within the Cypress folder as follows:

* For Cypress test files: `cypress/regression/{testName}/{testname.cy.js}`
* For feature files: `cypress/regression/{testName.feature}`

## Running the Project

After completing installation and configuration, you can run the project using various commands:

* Install dependencies:
```bash
npm i
```

* Run the project in development mode (Optional):
  If your application has a development server, start it before running Cypress tests.
  
```bash
npm run dev
```
* Open Cypress Test Runner:
```bash
npx cypress open
```

* Open Cypress Test Runner using Chrome:
```bash
npx cypress open --browser chrome
```
Additionally, you can enhance your Cypress tests with custom commands:

## Custom Commands
Add the following custom commands to your `cypress/support/command.js` file:

* Log a warning message:
```Javascript
Cypress.Commands.add("logInfo", (message) => {
  cy.log(`ℹ️  INFO: ${message}`);
});
```
* Wait for an element to be visible:
```Javascript
Cypress.Commands.add(
  "waitForElementToBeVisible",
  (selector, timeout = 5000) => {
    cy.get(selector, { timeout }).should("be.visible");
  }
);
});
```
* Assertion for element visibility:
```Javascript
Cypress.Commands.add("verifyElementVisible", (selector) => {
  cy.get(selector).should("be.visible");
});
```
* Get element by data-test attribute:
```Javascript
Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});
```
## Google Provider Authentication
If your project requires Google Sign-in, you can use the following custom code:

```Javascript
Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };

      window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
      cy.visit("/");
    });
  });
});
```
For further information about Google authentication, refer to this guide: [filiphric](https://filiphric.com/google-sign-in-with-cypress) and [Cypress documentation Google authentication](https://docs.cypress.io/guides/end-to-end-testing/google-authentication#__docusaurus_skipToContent_fallback)

For more detailed documentation, you can visit the [Cypress Cucumber Preprocessor Documentation](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor?activeTab=readme)

Additionally, you can find step-by-step guidance in this tutorial: [Cucumber in Cypress: A Step-by-Step Guide](https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide)
