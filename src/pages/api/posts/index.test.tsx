import { createMocks } from "node-mocks-http";

import handler from "./index";

describe("posts", () => {
  test("/api/posts handles returns 200 on succussful delete", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({}));

    process.env["DKS_API_BASE_URL"] = "http://localhost:8080";

    const { req, res } = createMocks({
      method: "DELETE",
      body: JSON.stringify({
        id: "testkey",
      }),
    });

    const response = await handler(req, res);

    expect(res.statusCode).toEqual(200);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/posts/testkey",
      { method: "delete" },
    );

    global.fetch.mockClear();
    delete global.fetch;
  });

  test("/api/posts returns internal server error if DELETE failed", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    global.fetch = jest.fn().mockImplementation(() => Promise.reject({}));

    const { req, res } = createMocks({
      method: "DELETE",
      body: JSON.stringify({
        id: "testkey",
      }),
    });

    const response = await handler(req, res);

    expect(res.statusCode).toEqual(500);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/posts/testkey",
      { method: "delete" },
    );

    global.fetch.mockClear();
    delete global.fetch;
  });

  test("/api/posts handles returns 200 on succussful post", async () => {
    const testPostData = {
      title: "First Blog",
      firstName: "John Doe",
      link: "https://example.com",
    };
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({}));
    process.env["DKS_API_BASE_URL"] = "http://localhost:8080";

    const { req, res } = createMocks({
      method: "POST",
      body: testPostData,
    });

    await handler(req, res);

    expect(res.statusCode).toEqual(200);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(testPostData),
      headers: new Object(),
    });
    expect;

    global.fetch.mockClear();
    delete global.fetch;
  });
});
