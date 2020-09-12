import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const Day = ({ number, currentMonth }) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.dayGrid}>
      <Paper
        elevation={3}
        className={currentMonth ? classes.currentMonth : classes.otherMonth}
      >
        <Typography variant="h7">{number}</Typography>
      </Paper>
    </Grid>
  );
};

export default Day;
