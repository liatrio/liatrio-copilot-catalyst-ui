import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { Blog } from "../../pages/index.page";
// import "@tesing-library/jest-dom";

const mockBlogList: Blog[] = [
  {
    id: "1",
    title: "Blog 1",
    firstName: "Walter White",
    link: new URL("https://www.example1.com"),
    dateAsDate: new Date().toLocaleString(),
    imageUrl: new URL("https://www.example1.com/image.jpg"),
  },
  {
    id: "2",
    title: "Blog 2",
    firstName: "Jesse Pinkman",
    link: new URL("https://www.example2.com"),
    dateAsDate: new Date().toLocaleString(),
    imageUrl: new URL("https://www.example2.com/image.jpg"),
  },
];

describe("Table", () => {
  test("renders the table with blog data without image", () => {
    render(
      <Table
        blogList={mockBlogList}
        handleDelete={() => {}}
        enableImageURL={false}
      />,
    );

    // Assert that the table headers are rendered
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Contributor")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Posted")).toBeInTheDocument();
    // Assert that the blog data is rendered
    expect(screen.getByText(mockBlogList[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockBlogList[0].firstName)).toBeInTheDocument();
    expect(screen.getByText(mockBlogList[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockBlogList[1].firstName)).toBeInTheDocument();
  });

  test("renders the table with blog data with image", () => {
    render(
      <Table
        blogList={mockBlogList}
        handleDelete={() => {}}
        enableImageURL={true}
      />,
    );

    // Assert that the table headers are rendered
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Contributor")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Posted")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
    // Assert that the blog data is rendered
    expect(screen.getByText(mockBlogList[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockBlogList[0].firstName)).toBeInTheDocument();
    expect(screen.getByText(mockBlogList[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockBlogList[1].firstName)).toBeInTheDocument();
  });

  test("calls handleDelete when delete button is clicked", () => {
    const handleDeleteMock = jest.fn();
    render(
      <Table
        blogList={mockBlogList}
        handleDelete={handleDeleteMock}
        enableImageURL={false}
      />,
    );

    // Find the delete button for the first blog and click it
    const deleteButton = screen.getAllByRole("button", { name: "x" })[0];
    fireEvent.click(deleteButton);

    // Assert that handleDelete is called with the correct blog id
    expect(handleDeleteMock).toHaveBeenCalledWith("1");
  });
});
