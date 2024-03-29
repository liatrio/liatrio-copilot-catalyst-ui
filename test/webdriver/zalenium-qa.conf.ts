import { config } from "./base.conf";

let hostname =
  process.env.ZALENIUM_HOSTNAME ||
  "zalenium-dev.nonprod-internal.exampleCompany.com";
let port: number = parseInt(process.env.ZALENIUM_PORT) || 443;
let protocol = process.env.ZALENIUM_PROTOCOL || "https";

config.capabilities = [
  {
    maxInstances: 1,
    browserName: "chrome",
    acceptInsecureCerts: true,
    strictSSL: false,
    hostname: hostname,
    port: port,
    protocol: protocol,
    path: "/wd/hub",
  },
];

config.baseUrl =
  "https://dks-ui-react-qa.nonprod.exampleCompany.com/";

export { config };
