import {
  render,
  screen,
  getAllByTestId,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShareForm, { Props } from "./ShareForm";

function doRender(overrides: Partial<Props> = {}) {
  render(
    <ShareForm enableImageURL={true} handleSubmit={() => {}} {...overrides} />,
  );
}

describe("ShareForm", () => {
  test("renders input fields", () => {
    doRender();

    const shareForm = screen.getByTestId("shareForm");
    const inputFields = getAllByTestId(shareForm, /input/);

    expect(inputFields).toHaveLength(4);
  });

  test("submits form when share button is clicked", async () => {
    const submitHandler = jest.fn((e) => e.preventDefault());

    doRender({ handleSubmit: submitHandler });
    const shareButton = screen.getByRole("button");

    await waitFor(() => userEvent.click(shareButton));

    expect(submitHandler).toHaveBeenCalled();
  });
});
