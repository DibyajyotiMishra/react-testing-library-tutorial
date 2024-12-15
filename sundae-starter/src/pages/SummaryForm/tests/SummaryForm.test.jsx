import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm Tests", () => {
  test("initial conditions", () => {
    render(<SummaryForm />);
    const checkboxComponent = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonComponent = screen.getByRole("button", {
      name: /confirm order/i,
    });

    // checking that button is disabled and checkbox is not checked on initial page load
    expect(buttonComponent).toBeDisabled();
    expect(checkboxComponent).not.toBeChecked();
  });

  test("checkbox enables button on first click and disables on second click", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkboxComponent = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonComponent = screen.getByRole("button", {
      name: /confirm order/i,
    });

    // click checkbox
    await user.click(checkboxComponent);

    // checkbox should be checked and button should be enabled
    expect(checkboxComponent).toBeChecked();
    expect(buttonComponent).toBeEnabled();

    // click checkbox again
    await user.click(checkboxComponent);

    // checkbox should be unchecked and button should be disabled
    expect(checkboxComponent).not.toBeChecked();
    expect(buttonComponent).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // hover over checkbox label
    const termsAndConditionsText = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditionsText);

    // popover should appear
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // hover off checkbox label
    await user.unhover(termsAndConditionsText);

    // popover should disappear
    expect(popover).not.toBeInTheDocument();
  });
});
