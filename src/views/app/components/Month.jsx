import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Day from "./Day";

const useStyles = makeStyles((theme) => ({
  weekday: {
    backgroundColor: "#3f51b5",
  },
  day: {
    width: "14.28%",
  },
}));

const compareReminderMoment = (m1, m2) =>
  m1.date() === m2.date() && m1.months() === m2.months();

const Month = ({ monthIndex, year }) => {
  const { reminders } = useSelector((state) => state.app);

  moment.updateLocale("en", {
    week: {
      dow: 0,
    },
  });

  console.log("monthIndex", monthIndex);
  console.log("year", year);
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

  for (var i = 1; i <= mYear.dayOfYear(); i++) {
    const mDay = moment().dayOfYear(i);

    if (
      (mDay.week() === firstWeekOfMonth || mDay.week() === lastWeekOfMonth) &&
      mMonth.month() !== mDay.month()
    ) {
      const dayReminders = reminders.filter((r) =>
        compareReminderMoment(r.datetime, mDay)
      );
      dayComponents.push(
        <Day
          number={mDay.date()}
          reminders={dayReminders}
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
          number={mDay.date()}
          reminders={dayReminders}
          key={i}
          currentMonth={true}
        />
      );
    }
  }

  return (
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
  );
};

export default Month;
