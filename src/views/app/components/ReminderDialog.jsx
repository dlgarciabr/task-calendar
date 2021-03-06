import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { CompactPicker } from "react-color";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import moment from "moment";

import { showErrorMessage } from "../ducks";
import { getWeather } from "../apis";

const ReminderDialog = (props) => {
  const { onClose, onSave, open } = props;
  const dispatch = useDispatch();

  const defaultReminder = {
    id: null,
    description: "",
    city: "",
    color: "#fff",
    datetime: null,
  };

  const [reminder, setReminder] = useState(defaultReminder);

  const [temporayDate, setTemporayDate] = useState("");
  const [temporayTime, setTemporayTime] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [cityWeather, setCityWeather] = useState({});
  const [isToday, setIsToday] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Create reminder");

  useEffect(() => {
    if (props.reminder) {
      setReminder(props.reminder);
      setTemporayDate(props.reminder.datetime.format("YYYY-MM-DD"));

      if (props.reminder.id) {
        setDialogTitle("Edit reminder");
        setTemporayTime(props.reminder.datetime.format("hh:mm"));
      }

      const today = moment();
      setIsToday(
        today.dayOfYear() === props.reminder.datetime.dayOfYear() &&
          today.year() === props.reminder.datetime.year()
      );
    }
  }, [props.reminder]);

  const handleDescriptionChange = (description) => {
    setReminder((prev) => {
      return { ...prev, description };
    });
  };

  const handleCityChange = (city) => {
    setReminder((prev) => {
      return { ...prev, city };
    });
  };

  const handleTimeChange = (date) => {
    setTemporayTime(date);
    const hours = Number(date.split(":")[0]);
    const minutes = Number(date.split(":")[1]);
    setReminder((prev) => {
      const datetime = prev.datetime;
      datetime.hour(hours);
      datetime.minute(minutes);
      return { ...prev, datetime };
    });
  };

  const handleDateChange = (date) => {
    setTemporayDate(date);
    const years = Number(date.split("-")[0]);
    const months = Number(date.split("-")[1]);
    const days = Number(date.split("-")[2]);
    setReminder((prev) => {
      const datetime = prev.datetime;
      datetime.year(years);
      datetime.month(months - 1);
      datetime.date(days);
      return { ...prev, datetime };
    });
  };

  const handleColorChange = (color) => {
    setReminder((prev) => {
      return { ...prev, color };
    });
  };

  const handleClickSave = () => {
    setDescriptionError(false);
    setDayError(false);
    setTimeError(false);
    setCityError(false);

    let hasErrors = false;

    if (!reminder.description) {
      hasErrors = true;
      setDescriptionError(true);
    }

    if (!temporayDate) {
      hasErrors = true;
      setDayError(true);
    }

    if (!temporayTime) {
      hasErrors = true;
      setTimeError(true);
    }

    if (!reminder.city) {
      hasErrors = true;
      setCityError(true);
    }

    if (hasErrors) {
      dispatch(showErrorMessage("Please fill the required fields"));
      return;
    }

    setTemporayTime("");
    onSave(reminder);
  };

  const handleClose = () => {
    setTemporayTime("");
    setCityWeather({});
    onClose();
  };

  const getWeatherForecast = async () => {
    let weather = { errorMessage: "Not available" };
    if (isToday) {
      weather = await getWeather(reminder.city);
    }
    setCityWeather(weather);
  };

  return (
    <Dialog
      aria-labelledby="reminder-dialog"
      open={open}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="reminder-dialog">{dialogTitle}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              error={descriptionError}
              label="Description"
              fullWidth
              value={reminder.description}
              inputProps={{
                maxLength: "30",
                "data-testid": "input-description",
              }}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="date"
              label="Date"
              type="date"
              error={dayError}
              defaultValue={temporayDate}
              inputProps={{
                "data-testid": "input-date",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleDateChange(e.target.value)}
            />
            <TextField
              id="Time"
              data-testid="input-time"
              label="Time"
              type="time"
              error={timeError}
              defaultValue={temporayTime}
              inputProps={{
                onChange: (e) => {
                  handleTimeChange(e.target.value);
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                error={cityError}
                inputProps={{
                  "data-testid": "input-city",
                }}
                value={reminder.city}
                onChange={(e) => handleCityChange(e.target.value)}
              />
            </Grid>
            <Grid item container xs={6}>
              <Tooltip
                title={
                  isToday
                    ? "Click to show weather forecast"
                    : "Weater forecast is currently available only for the current day"
                }
              >
                <Grid item xs={5}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={getWeatherForecast}
                    disabled={!isToday}
                  >
                    forecast
                  </Button>
                </Grid>
              </Tooltip>
              <Grid item xs={7}>
                <Typography variant="subtitle1">
                  {cityWeather.temp
                    ? `${cityWeather.temp}°C - ${cityWeather.condition}`
                    : cityWeather.errorMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} alignItems="center">
            <Grid item container xs={6}>
              <Grid item xs={2}>
                <Brightness1Icon
                  style={{
                    color: reminder.color,
                    borderColor: "black",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Current color</Typography>
                <Typography variant="subtitle2" style={{ fontStyle: "italic" }}>
                  change on right panel
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <CompactPicker
                onChange={(color) => handleColorChange(color.hex)}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <CloseIcon />
          Cancel
        </Button>
        <Button onClick={() => handleClickSave()} color="primary">
          <DoneIcon />
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDialog;
