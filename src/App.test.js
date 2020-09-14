import React from "react";
import userEvent from "@testing-library/user-event";
import moment from "moment";

import { render, screen, waitFor } from "./utils/test-utils";
import App from "./App";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Reminders", () => {
  test("Create a reminder", async () => {
    //arrange
    const today = moment();
    const description = "new test reminder";
    const date = today.format("MM/DD/YYYY");
    const time = "10:00 AM";
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
    userEvent.type(screen.getByTestId("input-date"), date);
    userEvent.type(screen.getByTestId("input-time"), time);
    userEvent.type(screen.getByTestId("input-city"), city);

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    //assert
    // await waitFor(() =>
    //   expect(
    //     screen.queryByRole("heading", { name: "Create reminder" })
    //   ).not.toBeInTheDocument()
    // );
    await waitFor(() =>
      expect(screen.queryByText("Create reminder")).not.toBeInTheDocument()
    );

    //TODO check if reminder is shown on calendar

    //TODO try to open edit dialog (opcional)

    // expect(screen.getByText(/All Nations/i)).toBeInTheDocument();
    // expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // expect(await screen.findByText(username)).toBeInTheDocument();
  });
});
