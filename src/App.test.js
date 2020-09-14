import React from "react";
import userEvent from "@testing-library/user-event";
import moment from "moment";

import { render, screen, APP_COMPONENT_KEY } from "./utils/test-utils";
import App from "./App";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Reminders", () => {
  test("Create a reminder", async () => {
    //arrange
    const today = moment();
    const description = "new test reminder";
    const date = today.format("MM-DD-YYYY");
    const time = "13:00";
    const city = "Monaco";

    //act
    render(<App />);

    //TODO click on card of today

    //TODO check if dialog opened

    //TODO fullfill dialog

    //TODO save reminder

    //assert

    //TODO check if reminder is shown on calendar

    //TODO try to open edit dialog (opcional)

    // expect(screen.getByText(/All Nations/i)).toBeInTheDocument();
    // expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // expect(await screen.findByText(username)).toBeInTheDocument();
  });
});
