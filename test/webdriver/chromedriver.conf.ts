import { config } from "./base.conf";

config.services.push("chromedriver");

config.capabilities = [
  {
    maxInstances: 1,
    browserName: "chrome",
    acceptInsecureCerts: true,
  },
];

config.baseUrl = "https://google.com";

export { config };
