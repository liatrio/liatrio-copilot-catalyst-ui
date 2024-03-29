// The following polyfills add base Next.js support for IE 9

// Copied from https://github.com/MaxArt2501/base64-js/blob/master/base64.js
import "./btoa";

if (typeof global?.history?.pushState !== "function") {
  // https://github.com/devote/HTML5-History-API
  require("html5-history-api");
}

// -- End IE 9 --

export {};
