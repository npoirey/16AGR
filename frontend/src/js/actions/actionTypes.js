const alertsActionsTypes = {
  error: 'ALERT.ERROR',
  reset: 'ALERT.RESET',
  success: 'ALERT.SUCCESS'
};

const userActionsTypes = {
  init: {
    started: 'USER.INIT.STARTED',
    fulfilled: 'USER.INIT.FULFILLED'
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
  }
};

module.exports = {
  alerts: alertsActionsTypes,
  user: userActionsTypes
};
