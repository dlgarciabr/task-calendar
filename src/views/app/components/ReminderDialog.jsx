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
import { CompactPicker } from "react-color";
import { Typography } from "@material-ui/core";
import moment from "moment";

const ReminderDialog = (props) => {
  const { onClose, onSave, open } = props;

  const defaultReminder = {
    id: null,
    description: "",
    city: "",
    color: "#fff",
    datetime: null,
  };

  const [reminder, setReminder] = useState(defaultReminder);

  useEffect(() => {
    if (props.reminder) {
      setReminder(props.reminder);
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
    onSave(reminder);
  };

  const handleClose = () => {
    setReminder(defaultReminder);
    onClose();
  };

  return (
    <Dialog
      aria-labelledby="reminder-dialog"
      open={open}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="reminder-dialog">Reminder</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Reminder"
              value={reminder.description}
              fullWidth
              inputProps={{ maxLength: "30" }}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={
                  reminder.datetime
                    ? reminder.datetime.format("YYYY-MM-DD")
                    : ""
                }
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleDateChange(e.target.value)}
              />
              <TextField
                id="time"
                label="Time"
                type="time"
                defaultValue={
                  reminder.id ? reminder.datetime.format("hh:mm") : ""
                }
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleTimeChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                value={reminder.city}
                onChange={(e) => handleCityChange(e.target.value)}
              />
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
        <Button onClick={onClose} color="primary">
          <CloseIcon />
          Cancelar
        </Button>
        <Button onClick={() => handleClickSave()} color="primary">
          <DoneIcon />
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDialog;
