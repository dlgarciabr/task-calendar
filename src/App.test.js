import React from "react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import { fireEvent } from "@testing-library/react";

import { render, screen, waitFor } from "./utils/test-utils";
import App from "./App";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Reminders", () => {
  test("Create a reminder to current day", async () => {
    //arrange
    const today = moment();
    const description = "new test reminder";
    const time = "10:00";
    const city = "Monaco";

    const createReminderAriaLabel = `create reminder to day ${today.date()} of ${today.format(
      "MMMM"
    )}`;

    render(<App />);

    //act
    const createReminderButton = screen.getByRole("button", {
      name: createReminderAriaLabel,
    });

    userEvent.click(createReminderButton);

    expect(
      screen.getByRole("heading", { name: "Create reminder" })
    ).toBeInTheDocument();

    userEvent.type(screen.getByTestId("input-description"), description);

    const materiaTextField = screen.getByTestId("input-time");

    fireEvent.change(materiaTextField.childNodes[1].firstChild, {
      target: { value: time },
    });

    userEvent.type(screen.getByTestId("input-city"), city);

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    //assert
    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: "Create reminder" })
      ).not.toBeInTheDocument()
    );

    const reminder = [
      ...createReminderButton.parentElement.nextElementSibling.childNodes,
    ].find((n) => n.innerHTML === `${time} ${description}`);

    expect(reminder).toBeInTheDocument();
  });
});
