const loginRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      error: true,
      message: 'Login Required',
    })
  }
  return next()
}

const adminRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      error: true,
      message: 'Login Required',
    })
  }
  if (!req.user.isAdmin()) {
    return res.status(403).send({
      error: true,
      message: 'Admin Required',
    })
  }
  return next()
}

module.exports = {
  loginRequired,
  adminRequired,
}
