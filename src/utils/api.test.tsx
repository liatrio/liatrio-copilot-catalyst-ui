import { performDelete } from "./api";

describe("api", () => {
  test("handleDelete calls api as expected", async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: "testkey" }));

    const sampleData = {
      id: "testkey",
    };

    await performDelete("testkey");

    expect(global.fetch).toHaveBeenCalledWith("/api/posts", {
      body: JSON.stringify(sampleData),
      method: "DELETE",
    });
    global.fetch.mockClear();
    delete global.fetch;
  });
});
