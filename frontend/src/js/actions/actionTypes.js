const userActionsTypes = {
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
  user: userActionsTypes
};
