import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";

import useStyles from "./App.styles";

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.app);

  useEffect(() => {
    notifications.forEach((messageData) => {
      props.enqueueSnackbar(messageData.message, {
        variant: messageData.variant,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Evaluation app
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {props.children || ""}
        </Container>
      </main>
    </div>
  );
}

export default withSnackbar(App);
