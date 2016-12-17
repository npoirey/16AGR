import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  blueGrey700,
  blueGrey900,
  blueGrey800,
  blue300,
  blueGrey100,
  grey300,
  blueGrey500,
  blueGrey300,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import Archives from "./pages/Archives";
import Featured from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import store from "./store";

// Needed for onTouchTap
// This dependency is temporary and will go away once the official React version is released
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey900,
    primary2Color: blueGrey700,
    primary3Color: blueGrey500,
    accent1Color: blue300,
    accent2Color: blueGrey100,
    accent3Color: blueGrey300,
    textColor: white,
    alternateTextColor: white,
    canvasColor: blueGrey500,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blueGrey800,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
    textColor: white,
  },
});

const app = document.getElementById('app');


function requireAuth(nextState, replace) {
  if (!store.getState() || !store.getState().user || !store.getState().user.user || !store.getState().user.user.id) {
    replace({
      pathname: '/login'
    })
  }
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <Route onEnter={requireAuth}>
            <IndexRoute name="Featured" component={Featured}/>
            <Route path="archives(/:article)" name="archives" component={Archives}/>
            <Route path="settings" name="settings" component={Settings}/>
          </Route>
          <Route path="login" component={Login}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , app);
