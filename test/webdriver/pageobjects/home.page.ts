import Page from "./page";

class HomePage extends Page {
  get heading() {
    return $("[role=heading]");
  }
  get blogs() {
    return $$("tr");
  }

  open() {
    return super.open("");
  }
}

export default new HomePage();
