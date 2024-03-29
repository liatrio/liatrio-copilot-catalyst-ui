import HomePage from "../pageobjects/home.page";

describe("Share Form", () => {
  it("The main page loads properly", async () => {
    await HomePage.open();

    const titleText = "Google";
    await expect(browser).toHaveTitle(titleText);
  });
});
