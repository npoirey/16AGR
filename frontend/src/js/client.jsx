import {
  blue300,
  blueGrey100,
  blueGrey300,
  blueGrey50,
  blueGrey500,
  blueGrey600,
  blueGrey700,
  blueGrey800,
  blueGrey900,
  darkBlack,
  fullBlack,
  grey300,
  white,
} from 'material-ui/styles/colors'
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles/index'
import { fade, lighten } from 'material-ui/utils/colorManipulator'
import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import actions from './actions/actionTypes'
import User from './pages/admin/user/CreateUserPage'
import Users from './pages/admin/users/Users'
import ErrorPage from './pages/front/ErrorPage'
import Login from './pages/front/Login'
import Layout from './pages/Layout'
import Featured from './pages/member/home/Home'
import store from './store'

require('../static/favicon.ico')

// Needed for onTouchTap
// This dependency is temporary and will go away once the official React version is released
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey900,
    primary2Color: blueGrey700,
    primary3Color: blueGrey500,
    accent1Color: blue300,
    accent2Color: blueGrey100,
    accent3Color: blueGrey300,
    textColor: blueGrey50,
    alternateTextColor: blueGrey50,
    canvasColor: blueGrey700,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blueGrey800,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
    textColor: white,
    color: blueGrey900,
  },
  icon: {
    color: blueGrey700,
    backgroundColor: blueGrey700,
  },
  raisedButton: {
    color: blueGrey600,
    disabledColor: fade(blueGrey600, 0.6),
  },
  snackbar: {
    backgroundColor: blueGrey900,
  },
  tableHeaderColumn: {
    spacing: 10,
  },
  tableRowColumn: {
    spacing: 10,
  },
  tableRow: {
    hoverColor: blueGrey600,
    stripeColor: fade(lighten(blueGrey600, 0.1), 0.4),
    selectedColor: blueGrey500,
  },
  textField: {
    hintColor: blueGrey50,
    floatingLabelColor: blueGrey50,
    disabledTextColor: blueGrey50,
    focusColor: blue300,
    borderColor: grey300,
  },
})

const app = document.getElementById('app')

function isLoggedIn() {
  return store.getState() && store.getState().user && store.getState().user.user && store.getState().user.user.id
}

const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login',
    })
  }
}

const requireAdmin = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login',
    })
  } else if (!store.getState().user.user.admin) {
    replace({
      pathname: '/403',
    })
  }
}

const requireNotAuth = (nextState, replace) => {
  if (isLoggedIn()) {
    replace({
      pathname: '/',
    })
  }
}

store.dispatch({ type: actions.user.init.fulfilled, payload: window.user })

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <IntlProvider locale="en">
        <Router history={browserHistory}>
          <Route path="/" component={Layout}>
            <Route onEnter={requireAuth}>
              <IndexRoute name="Featured" component={Featured} />
            </Route>
            <Route path="admin" onEnter={requireAdmin}>
              <Route path="users" name="users" component={Users} />
              <Route path="users/create" name="user" component={User} />
              <Route path="users/:userId" name="user" component={User} />
            </Route>
            <Route path="login" component={Login} onEnter={requireNotAuth} />
            <Route path="403" component={ErrorPage} />
          </Route>
        </Router>
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>
  , app)
