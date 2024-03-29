import { Publisher } from "@pact-foundation/pact";
import { versionFromGitTag } from "@pact-foundation/absolute-version";
import path from "path";

const branch = process.env.CIRCLE_BRANCH;
const consumerVersion = versionFromGitTag();

const pactBrokerUrl = process.env.PACT_BROKER_URL || "http://localhost:9292";
const pactBrokerUsr = process.env.PACT_BROKER_USR || "";
const pactBrokerPwd = process.env.PACT_BROKER_PWD || "";

const opts = {
  pactFilesOrDirs: [path.resolve("contracts")],
  pactBroker: pactBrokerUrl,
  pactBrokerUsername: pactBrokerUsr,
  pactBrokerPassword: pactBrokerPwd,
  tags: [branch],
  consumerVersion,
};

new Publisher(opts)
  .publishPacts()
  .then(() => {
    console.log(
      `Pact contract for consumer version ${consumerVersion} published!`
    );
  })
  .catch((e) => {
    console.log("Pact contract publishing failed: ", e);
  });
