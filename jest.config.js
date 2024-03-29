// See https://nextjs.org/docs/testing

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

// See https://jestjs.io/docs/configuration
const jestConfig = {
  resetMocks: true,
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  coverageReporters: ["text", "html", "lcov"],
  globals: {
    fetch: global.fetch,
  },
};

module.exports = createJestConfig(jestConfig);
