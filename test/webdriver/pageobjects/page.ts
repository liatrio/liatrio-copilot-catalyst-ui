export default class Page {
  open(path: string): Promise<string> {
    return browser.url(path);
  }
}
