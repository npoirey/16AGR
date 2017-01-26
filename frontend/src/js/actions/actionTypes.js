const alertsActionsTypes = {
  error: 'ALERT.ERROR',
  reset: 'ALERT.RESET',
  success: 'ALERT.SUCCESS',
}

const eventActionsTypes = {
  fetch: {
    started: 'EVENTS.FETCH.STARTED',
    fulfilled: 'EVENTS.FETCH.FULFILLED',
    rejected: 'EVENTS.FETCH.REJECTED',
  },
}

const userActionsTypes = {
  init: {
    fulfilled: 'USER.INIT.FULFILLED',
  },
  login: {
    started: 'USER.LOGIN.STARTED',
    fulfilled: 'USER.LOGIN.FULFILLED',
    rejected: 'USER.LOGIN.REJECTED',
  },
  logout: {
    started: 'USER.LOGOUT.STARTED',
    fulfilled: 'USER.LOGOUT.FULFILLED',
    rejected: 'USER.LOGOUT.REJECTED',
  },
  changePreferences: {
    started: 'USER.CHANGE.PREFERENCES.STARTED',
    fulfilled: 'USER.CHANGE.PREFERENCES.FULFILLED',
    rejected: 'USER.CHANGE.PREFERENCES.REJECTED',
  },
}

const usersActionsTypes = {
  fetch: {
    started: 'USERS.FETCH.STARTED',
    fulfilled: 'USERS.FETCH.FULFILLED',
    rejected: 'USERS.FETCH.REJECTED',
  },
}

module.exports = {
  alerts: alertsActionsTypes,
  events: eventActionsTypes,
  user: userActionsTypes,
  users: usersActionsTypes,
}
