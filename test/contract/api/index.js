import fetch from "node-fetch";
import { URL, URLSearchParams } from "url";

const endpoints = {
  postsList: (base, params) => {
    const url = new URL(`${base}/posts`);
    url.search = new URLSearchParams(params).toString();
    return fetch(url, {
      headers: {},
    });
  },
};

export default endpoints;
