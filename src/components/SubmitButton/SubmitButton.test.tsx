import { render, screen } from "@testing-library/react";

import SubmitButton from "./SubmitButton";

const defaultProps = {
  label: "Test",
};

// Call render. First pass the defaultProps to satisfy any required props, then
//  the overrides which are specific to the individual test
function doRender(overrides: any = {}) {
  render(<SubmitButton {...defaultProps} {...overrides} />);
}

describe("SubmitButton", () => {
  test('Text shows "Test"', () => {
    const myComponent = doRender();
    const heading = screen.getByText(/Test/i);

    expect(heading).toBeInTheDocument();
  });
});
