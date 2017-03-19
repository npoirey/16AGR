import { unauthorized, forbidden } from '../core/responses'
import logger from '../core/logger'

const loginRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.warn('disconnected user tried to access member service')
    return unauthorized(next, 'Login Required')
  }
  return next()
}

const adminRequired = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.warn('disconnected user tried to access admin service')
    return unauthorized(next, 'Login Required')
  }
  if (!req.user.isAdmin()) {
    logger.warn(`user ${req.user.email} tried to access admin service but is not admin`)
    return forbidden(next, 'Admin Required')
  }
  return next()
}

module.exports = {
  loginRequired,
  adminRequired,
}
