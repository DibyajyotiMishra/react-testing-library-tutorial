import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { describe, expect } from "vitest";
import { kebabToTitleCase } from "./helpers";

test("button click flow", () => {
  // render the app
  render(<App />);

  // find the button
  const buttonElement = screen.getByRole("button", { name: /blue/i });

  // check the initial color
  expect(buttonElement).toHaveClass("medium-violet-red");

  // click the button
  fireEvent.click(buttonElement);

  // check the new button text
  expect(buttonElement).toHaveTextContent(/medium violet red/i);

  // check the new color
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("checkbox flow", () => {
  render(<App />);

  // find checkbox and button
  const buttonElement = screen.getByRole("button", { name: /midnight blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // check checkbox
  fireEvent.click(checkboxElement);

  // check that button is disabled
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // uncheck checkbox
  fireEvent.click(checkboxElement);

  // check that button is enabled
  expect(buttonElement).toBeEnabled();
});

test("complete flow", () => {
  // render the app
  render(<App />);

  // find the button
  const buttonElement = screen.getByRole("button", {
    name: /midnight blue/i,
  });

  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // checking if button is initally red and checkbox is unchecked
  expect(buttonElement).toHaveClass("medium-violet-red");
  expect(checkboxElement).not.toBeChecked();

  // check checkbox
  fireEvent.click(checkboxElement);

  // checking if button is disabled
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // uncheck checkbox
  fireEvent.click(checkboxElement);

  // checking if button is enabled and color is red
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");

  // change button color to blue
  fireEvent.click(buttonElement);

  // checking if button is enabled and color is blue
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");

  // check checkbox
  fireEvent.click(checkboxElement);

  // checking if button is disabled
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // uncheck checkbox
  fireEvent.click(checkboxElement);

  // checking if button is enabled and color is blue
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebabToTitleCase", () => {
  test("works for no hyphen", () => {
    expect(kebabToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphen", () => {
    expect(kebabToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
