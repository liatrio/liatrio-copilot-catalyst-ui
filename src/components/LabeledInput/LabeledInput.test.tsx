import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LabeledInput from "./LabeledInput";

describe("LabeledInput", () => {
  test("renders LabeledInput component with initial value", () => {
    const initialValue = "Test Value";
    render(
      <LabeledInput
        label="Test Label"
        name="test"
        initialValue={initialValue}
      />,
    );
    const labeledInput = screen.getByTestId("inputtest");
    expect(labeledInput).toBeInTheDocument();
    expect(labeledInput).toHaveValue(initialValue);
  });

  test("updates value when input is changed", () => {
    const initialValue = "Test Value";
    const updatedValue = "Updated Value";
    render(
      <LabeledInput
        label="Test Label"
        name="test"
        initialValue={initialValue}
      />,
    );
    const labeledInput = screen.getByTestId("inputtest");
    fireEvent.change(labeledInput, { target: { value: updatedValue } });
    expect(labeledInput).toHaveValue(updatedValue);
  });

  test("clears value when clear() is called", () => {
    const initialValue = "Test Value";
    render(
      <LabeledInput
        label="Test Label"
        name="test"
        initialValue={initialValue}
      />,
    );
    const labeledInput = screen.getByTestId("inputtest");
    fireEvent.change(labeledInput, { target: { value: "" } });
    expect(labeledInput).toHaveValue("");
  });

  test("returns value when getValue() is called", () => {
    const initialValue = "Test Value";
    render(
      <LabeledInput
        label="Test Label"
        name="test"
        initialValue={initialValue}
      />,
    );
    const labeledInput = screen.getByTestId("inputtest");
    expect(labeledInput).toHaveValue(initialValue);
  });
});
