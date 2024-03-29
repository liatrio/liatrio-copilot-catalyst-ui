import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index.page";
import { Blog } from "./index.page";

describe("Home", () => {
  test("renders Home component with initial blog list and image URL disabled", () => {
    const testData: Blog[] = [
      {
        id: "1",
        title: "Blog 1",
        firstName: "John Doe",
        link: new URL("https://www.example1.com"),
      },
      {
        id: "2",
        title: "Blog 2",
        firstName: "Jane Doe",
        link: new URL("https://www.example2.com"),
      },
    ];
    render(<Home initialBlogList={testData} enableImageURL={false} />);

    // Assert that the initial blog list is rendered
    const blogListItems = screen.getAllByTestId("blog-list-item");
    expect(blogListItems).toHaveLength(testData.length);
  });
});
