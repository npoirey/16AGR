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
  }
};

module.exports = {
  user: userActionsTypes
};
