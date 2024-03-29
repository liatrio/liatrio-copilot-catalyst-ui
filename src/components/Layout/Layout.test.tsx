import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  test("renders Layout component with title", () => {
    const title = "Test Title";
    render(<Layout title={title}>Test Content</Layout>);
    const layoutTitle = screen.getByText(title);
    expect(layoutTitle).toBeInTheDocument();
  });

  test("renders Layout component with children", () => {
    const children = "Test Content";
    render(<Layout title="Test Title">{children}</Layout>);
    const layoutChildren = screen.getByText(children);
    expect(layoutChildren).toBeInTheDocument();
  });

  test("renders Layout component with logo", () => {
    render(<Layout title="Test Title">Test Content</Layout>);
    const logo = screen.getByAltText("dojo-small");
    expect(logo).toBeInTheDocument();
  });

  test("renders Layout component with Liatrio logo", () => {
    render(<Layout title="Test Title">Test Content</Layout>);
    const liatrioLogo = screen.getByAltText("Liatrio");
    expect(liatrioLogo).toBeInTheDocument();
  });

  test("renders Layout component with About link", () => {
    render(<Layout title="Test Title">Test Content</Layout>);
    const aboutLink = screen.getByText("| About |");
    expect(aboutLink).toBeInTheDocument();
  });
});
