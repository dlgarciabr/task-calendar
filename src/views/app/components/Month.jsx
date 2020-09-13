import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import { createReminder, editReminder } from "../ducks";
import ReminderDialog from "./ReminderDialog";
import Day from "./Day";
import { showSuccessMessage } from "../ducks";

const useStyles = makeStyles((theme) => ({
  weekday: {
    backgroundColor: "#3f51b5",
  },
  day: {
    width: "14.28%",
  },
}));

const compareReminderMoment = (m1, m2) =>
  m1.date() === m2.date() && m1.month() === m2.month();

const Month = ({ monthIndex, year }) => {
  const { reminders } = useSelector((state) => state.app);
  const [openReminderDialog, setOpenReminderDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const dispatch = useDispatch();

  moment.updateLocale("en", {
    week: {
      dow: 0,
    },
  });

  const classes = useStyles();

  const weekArray = moment.weekdays();

  const mMonth = moment([year, monthIndex]);
  const mYear = moment([year, 11, 31]);
  const monthName = mMonth.format("MMMM");

  const firstWeekOfMonth = moment(mMonth)
    .startOf("month")
    .startOf("week")
    .week();

  const lastWeekOfMonth = moment(mMonth).endOf("month").endOf("week").week();

  const dayComponents = [];

  const handleCreateReminder = (mDay) => {
    setEditingReminder({
      id: null,
      description: "",
      city: "",
      color: "#DAF7A6",
      datetime: mDay,
    });
    showReminderDialog();
  };

  const handleEditReminder = (reminderId) => {
    setEditingReminder(reminders.find((r) => r.id === reminderId));
    showReminderDialog();
  };

  const showReminderDialog = () => {
    setOpenReminderDialog(true);
  };

  const handleClickSaveReminder = (reminder) => {
    if (reminder.id) {
      dispatch(editReminder(reminder));
    } else {
      dispatch(createReminder({ ...reminder, id: Date.now() }));
    }

    setOpenReminderDialog(false);
    dispatch(showSuccessMessage());
  };

  for (var i = 1; i <= mYear.dayOfYear(); i++) {
    const mDay = moment().dayOfYear(i).year(year);

    if (
      (mDay.week() === firstWeekOfMonth || mDay.week() === lastWeekOfMonth) &&
      mMonth.month() !== mDay.month()
    ) {
      const dayReminders = reminders.filter((r) =>
        compareReminderMoment(r.datetime, mDay)
      );
      dayComponents.push(
        <Day
          currentMoment={mDay}
          reminders={dayReminders}
          handleCreateReminder={() => handleCreateReminder(mDay)}
          handleEditReminder={handleEditReminder}
          key={i}
          currentMonth={false}
        />
      );
    } else if (mMonth.month() === mDay.month()) {
      const dayReminders = reminders.filter((r) =>
        compareReminderMoment(r.datetime, mDay)
      );
      dayComponents.push(
        <Day
          currentMoment={mDay}
          reminders={dayReminders}
          handleCreateReminder={() => handleCreateReminder(mDay.clone())}
          handleEditReminder={handleEditReminder}
          key={i}
          currentMonth={true}
        />
      );
    }
  }

  return (
    <>
      <Paper elevation={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">{monthName}</Typography>
          </Grid>
          {weekArray.map((weekday) => (
            <Grid
              color="seconday"
              item
              key={Math.random() * 10}
              className={classes.day}
              style={{ textAlign: "center" }}
            >
              <Paper elevation={3} className={classes.weekday}>
                <Typography variant="subtitle1" style={{ color: "#fff" }}>
                  {weekday}
                </Typography>
              </Paper>
            </Grid>
          ))}
          <Grid item container spacing={1}>
            {dayComponents}
          </Grid>
        </Grid>
      </Paper>
      <ReminderDialog
        reminder={editingReminder}
        open={openReminderDialog}
        onClose={() => setOpenReminderDialog(false)}
        onSave={(reminder) => handleClickSaveReminder(reminder)}
      />
    </>
  );
};

export default Month;
