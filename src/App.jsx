import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";

import useStyles from "./App.styles";
import Menu from "./components/Menu";
import {
  fulfillUser,
  fulfillAllRules,
  getErrorMessage,
  networkErrorOccurred,
} from "./views/app/ducks";
import { getUser, getAllRules } from "./views/app/apis";

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { notifications, user, online, allRules } = useSelector(
    (state) => state.app
  );
  //const [allRules, setAllRules] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(fulfillUser(user));
  };
  const handleRequestError = (message) => {
    dispatch(getErrorMessage(message));
    return Promise.reject(message);
  };

  if (user === null && online) {
    (async function () {
      try {
        const user = await getUser(process.env.REACT_APP_API_URL);

        if (process.env.NODE_ENV === "development") {
          user.groups = ["NATIONS\\perfil_admin"];
        }
        const rules = await getAllRules(process.env.REACT_APP_API_URL);
        dispatch([fulfillUser(user), fulfillAllRules(rules)]);
      } catch (error) {
        dispatch([networkErrorOccurred(), getErrorMessage(error.message)]);
      }
    })();

    axios.interceptors.response.use(
      function (response) {
        if (response.data.status !== 200) {
          return handleRequestError(response.data.message);
        }
        return response;
      },
      function (error) {
        return handleRequestError(error.message);
      }
    );
  }

  useEffect(() => {}, [user]);

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
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Tooltip title="Abrir menu">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Abrir menu"
              onClick={handleDrawerOpen}
              data-testid="button-open-drawer"
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            All Nations {online ? "" : "[sistema offline]"}
          </Typography>
          <div>{user?.name}</div>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon onClick={() => alert("not implemented yet")} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Tooltip title="Fechar menu">
            <IconButton
              onClick={handleDrawerClose}
              data-testid="button-close-drawer"
            >
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        <Menu
          allRules={allRules}
          userActiveDirectoryGroups={user ? user.groups : []}
        />
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>
      {/* <div className="App">{props.children}</div> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {props.children || ""}
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}

export default withSnackbar(App);
