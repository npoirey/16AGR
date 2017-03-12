import { unauthorized, forbidden } from '../core/responses'

const loginRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return unauthorized(next, 'Login Required')
  }
  return next()
}

const adminRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return unauthorized(next, 'Login Required')
  }
  if (!req.user.isAdmin()) {
    return forbidden(next, 'Admin Required')
  }
  return next()
}

module.exports = {
  loginRequired,
  adminRequired,
}
