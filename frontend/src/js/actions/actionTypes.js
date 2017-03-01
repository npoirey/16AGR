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
  create: {
    started: 'USERS.CREATE.STARTED',
    fulfilled: 'USERS.CREATE.FULFILLED',
    rejected: 'USERS.CREATE.REJECTED',
  },
  fetch: {
    started: 'USERS.FETCH.STARTED',
    fulfilled: 'USERS.FETCH.FULFILLED',
    rejected: 'USERS.FETCH.REJECTED',
  },
  fetchById: {
    started: 'USERS.FETCH_BY_ID.STARTED',
    fulfilled: 'USERS.FETCH_BY_ID.FULFILLED',
    rejected: 'USERS.FETCH_BY_ID.REJECTED',
  },
}

module.exports = {
  alerts: alertsActionsTypes,
  events: eventActionsTypes,
  user: userActionsTypes,
  users: usersActionsTypes,
}
