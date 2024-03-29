import { config } from "./base.conf";

config.services.push("chromedriver");

config.capabilities = [
  {
    maxInstances: 1,
    browserName: "chrome",
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage'],
    },
  },
];

config.baseUrl = "https://google.com";

export { config };
