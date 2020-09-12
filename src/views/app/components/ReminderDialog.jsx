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

const ReminderDialog = (props) => {
  const { onClose, onSave, reminder, open } = props;
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Dialog
      aria-labelledby="reminder-dialog"
      open={open}
      onClose={onClose}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="reminder-dialog">Reminder</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs="12">
            <TextField
              label="Reminder"
              fullWidth
              inputProps={{ maxLength: "30" }}
            />
          </Grid>
          <Grid item container xs="12">
            <Grid item xs="6">
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs="6">
              <TextField label="City" fullWidth />
            </Grid>
          </Grid>
          <Grid item container xs="12" alignItems="center">
            <Grid item container xs="6">
              <Grid item xs="2">
                <Brightness1Icon
                  style={{
                    color: selectedColor,
                    borderColor: "black",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Current color</Typography>
                <Typography variant="subtitle2" style={{ fontStyle: "italic" }}>
                  select on right panel
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <CompactPicker
                onChange={(color) => setSelectedColor(color.hex)}
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
        <Button onClick={() => alert("todo")} color="primary">
          <DoneIcon />
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDialog;
