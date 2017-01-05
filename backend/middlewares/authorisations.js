const loginRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      success: false,
      message: 'Login Required',
    })
  }
  return next()
}

const adminRequired = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.isAdmin()) {
    return res.status(403).send({
      success: false,
      message: 'Admin Required',
    })
  }
  return next()
}

module.exports = {
  loginRequired,
  adminRequired,
}
