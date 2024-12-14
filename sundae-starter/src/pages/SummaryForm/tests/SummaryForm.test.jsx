import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "vitest";
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

  test("checkbox enables button on first click and disables on second click", () => {
    render(<SummaryForm />);
    const checkboxComponent = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonComponent = screen.getByRole("button", {
      name: /confirm order/i,
    });

    // click checkbox
    fireEvent.click(checkboxComponent);

    // checkbox should be checked and button should be enabled
    expect(checkboxComponent).toBeChecked();
    expect(buttonComponent).toBeEnabled();

    // click checkbox again
    fireEvent.click(checkboxComponent);

    // checkbox should be unchecked and button should be disabled
    expect(checkboxComponent).not.toBeChecked();
    expect(buttonComponent).toBeDisabled();
  });
});
