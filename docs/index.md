Application
Name: dks-ui-nextjs
Description :

This is an opinionated starter kit for the Next.js React framework. This starter kit includes the following features

## Features

- ✏️ Uses the latest [Next.js](https://nextjs.org/docs) along with [typescript](https://www.typescriptlang.org/)
- ✏️ Uses the latest [React.js](https://reactjs.org/docs)
- ✏️ Find and fix problems in your JavaScript code with [eslint](https://eslint.org/)
- ✏️ An opinionated code formatter with [Prettier](https://prettier.io/)
- ✏️ A modern linter that helps you avoid errors and enforce
  conventions in your styles with [Stylelint](https://stylelint.io/)
- ✏️ A most mature, stable, and powerful professional grade
  CSS extension with [Sass](https://sass-lang.com/)
- ✏️ BDD / TDD assertion library for node and the browser with [Chai](https://www.chaijs.com/)
- ✏️ The fun, simple, flexible JavaScript test framework with [Mocha](https://mochajs.org/)
- ✏️ The next generation front end testing tool built for the modern
  web with [Cypress](https://docs.cypress.io/)

## Getting Started

## Run template in local

1. Change your working directory to application root folder

2. Install dependencies using below command

   ```bash
   npm install

   ```

3. To Build the application, run the below command

   ```bash
   npm run validate:build
   ```

4. To Run the application, execute the below command

   ```bash
   npm start
   ```

5. To execute testcases, run the below command

   ```bash
   npm run test
   ```

### Steps to access the API and application index page

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

3. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Steps to run Cypress test on browser - Local Run

1.  Run the below command

```bash
npm run cypress
```

or
Run Cypress on Browser: Electron 93 (headless)

```bash
npm run cy:test

```

2. Follow the opened broweser and get the test case listed.
3. Select and click the test case to run
