const config: WebdriverIO.Config = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "test/webdriver/tsconfig.json",
    },
  },
  specs: ["./test/webdriver/specs/**/*.ts"],
  maxInstances: 1,
  services: [],
  capabilities: [],
  logLevel: "info",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};

export { config };
