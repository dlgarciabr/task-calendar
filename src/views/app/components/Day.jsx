import React from "react";
import { Grid, Paper, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconAddCircle from "@material-ui/icons/AddCircle";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  dayGrid: {
    width: "14.28%",
  },
  currentMonth: {
    height: "100px",
    backgroundColor: "#fff",
  },
  otherMonth: {
    height: "100px",
    backgroundColor: "#C0C6C8",
  },
}));

const Day = ({
  currentMoment,
  currentMonth,
  reminders = [],
  handleCreateReminder,
  handleEditReminder,
}) => {
  const classes = useStyles();
  const today = moment();
  const isToday =
    today.dayOfYear() === currentMoment.dayOfYear() &&
    today.year() === currentMoment.year();

  return (
    <Grid item className={classes.dayGrid}>
      <Paper
        elevation={3}
        style={isToday ? { backgroundColor: "#DFCA74" } : {}}
        className={currentMonth ? classes.currentMonth : classes.otherMonth}
      >
        <Typography variant="h6">
          {currentMoment.date()}
          <IconAddCircle
            style={{ float: "right", cursor: "pointer" }}
            onClick={handleCreateReminder}
          />
        </Typography>
        <div style={{ overflowY: "auto", height: "60px" }}>
          {reminders
            .sort((a, b) => (moment(a.datetime).isBefore(b.datetime) ? -1 : 1))
            .map(({ id, description, city, datetime, color }) => (
              <Tooltip
                key={Math.random() * 10}
                title={`${description} on ${city} at ${datetime.format(
                  "dddd, MMMM Do YYYY, hh:mm a"
                )}`}
              >
                <div
                  style={
                    color
                      ? { backgroundColor: color, cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => handleEditReminder(id)}
                >
                  {datetime.format("hh:mm")} {description}
                </div>
              </Tooltip>
            ))}
        </div>
      </Paper>
    </Grid>
  );
};

export default Day;
