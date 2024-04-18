# Cypress with Cucumber (BDD)

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
Modify the cypress.config.js file as follows:

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

## 5.(Optional) Enable Cypress Studio
If you want to add Cypress Studio, include the following line in your cypress.config.js file within the e2e section:

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

*For Cypress test files: `cypress/regression/{testName}/{testname.cy.js}`
*For feature files: `cypress/regression/{testName.feature}`


## Running the Project

After completing the installation and configuration, you can run the project using the following commands:

```bash
npm i
```

```bash
npm run dev
```

```bash
npx cypress open
```

To open using Chrome:

```bash
npx cypress open --browser chrome
```

For further documentation, refer to the  [docu](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor?activeTab=readme)

Additionally, detailed steps can be found at [steps](https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide)
