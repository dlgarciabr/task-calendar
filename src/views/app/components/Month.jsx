import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import Day from "./Day";
import { camelCase } from "lodash";

const useStyles = makeStyles((theme) => ({
  day: {
    width: "14.28%",
  },
}));

const Month = ({ monthIndex, year }) => {
  moment.updateLocale("en", {
    week: {
      dow: 0,
    },
  });

  console.log("monthIndex", monthIndex);
  console.log("year", year);
  const classes = useStyles();

  const weekArray = moment.weekdays();
  const today = moment();
  //const todayNumber = currentDay.getDate();
  const mMonth = moment([year, monthIndex]);
  const mYear = moment([year, 11, 31]);
  const monthDaysQty = mMonth.daysInMonth();
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
      dayComponents.push(
        <Day number={mDay.date()} events={[]} key={i} currentMonth={false} />
      );
    } else if (mMonth.month() === mDay.month()) {
      dayComponents.push(
        <Day number={mDay.date()} events={[]} key={i} currentMonth={true} />
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
            item
            key={Math.random() * 10}
            className={classes.day}
            style={{ textAlign: "center" }}
          >
            <Paper elevation={3}>{weekday}</Paper>
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
