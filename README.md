#Cypress with Cucumber (BDD)
how to install cypress with cucumber

install cypress

```bash
npm install cypress --save-dev
```

also install this for cucumber

```bash
npm i @badeball/cypress-cucumber-preprocessor
```

```bash
npm i @bahmutov/cypress-esbuild-preprocessor
```

and change the cypress.config file

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

if you want to add the Cypress studio

```javascript
experimentalStudio: true,
```

just add this to your cypres.config file inside the e2e

also, change the package.json file

```javascript
{
  "dependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^20.0.3",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0"
  },
  "devDependencies": {
    "cypress": "^13.7.3",
    "typescript": "^5.4.5"
  }
}
```

it should be like this

make a json file in the root directory and follow this naming format 

```javascript
.cypress-cucumber-preprocessorrc.json
```
and Paste this inside

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
after that adjust the file system in the Cypress folder

for the Cypress test directory
cypress/regression/{testName}/{testname.cy.js}

for the feature 
cypress/regression/{testName.feature}

## and you're done with the installation

you can run the project

```bash
npm i
```
```bash
npm run dev
```
```bash
npx cypress open
```
for opening using chrome

```bash
npx cypress open --browser chrome
```

for further documentation regard to this [docu](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor?activeTab=readme)

as for the Steps regard to this website [steps](https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide)
