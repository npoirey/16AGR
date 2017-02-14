import bcrypt from 'bcrypt-nodejs'
import express from 'express'
import { loginRequired, adminRequired } from '../middlewares/authorisations'
import UserPreference from '../models/UserPreference'
import User from '../models/User'
import { validatorFactory as v } from '../core/validator/express-ajv-validator'
import { conflict, badRequest, created } from '../core/responses'
import logger from '../core/logger'

const router = express.Router()

/**
 * Service 001 - New user creation
 */
router.post('/create', adminRequired, v('001_in'), (req, res, next) => {
  if (!req.body.password || req.body.password.length < 8 || req.body.password.length > 30) {
    return badRequest(next, 'Password need to have between 8 to 30 characters')
  }
  if (req.body.password !== req.body.passwordRepeat) {
    return badRequest(next, 'Passwords do not match')
  }

  const userDao = new User()
  userDao.query(
    {
      where: { callsign: req.body.callsign },
      orWhere: { email: req.body.email },
    })
    .fetch()
    .then((result) => {
      if (result) {
        logger.warn('Another user exists with this mail or callsign', result)
        return conflict(next, 'Another user exists with this mail or callsign')
      }

      bcrypt.hash(req.body.password, null, null, (err, hash) => {
        const newUser = { ...req.body, password: hash }
        delete newUser.passwordRepeat
        User.forge(newUser)
          .save()
          .then((user) => {
            logger.info('Created new user', user)
            created(res, { id: user.id })
          })
      })
    })
    .catch((err) => {
      logger.error('failed to create user', err)
      next(err)
    })
})

router.post('/synthesis', adminRequired, (req, res, next) => {
  const userDao = new User()
  const request = req.body
  if (request.filters && request.filters.length > 0) {
    request.filters.forEach((filter) => {
      switch (filter.type) {
        case 'boolean':
          userDao.where(filter.name, filter.pattern)
          break
        case 'contains':
          userDao.where(filter.name, '~*', filter.pattern)
          break
        default:
          break
      }
    })
  }
  if (request.sort && request.sort.name && request.sort.order) {
    userDao.orderBy(request.sort.name, request.sort.order)
  }
  userDao.fetchAll()
    .then((users) => {
      res.send({
        success: true,
        message: 'Users fetched',
        items: users,
      })
    })
    .catch((err) => {
      next({ ...err, message: 'Could not fetch users' })
    })
})

router.post('/preferences', loginRequired, (req, res, next) => {
  if (req.user.id !== req.body.userId && !req.user.isAdmin()) {
    res.send(403)
  }
  const userId = req.user.id
  new UserPreference({ userId }).save(req.body, { method: 'update' })
    .then(() => {
      res.send({
        success: true,
        message: 'Preferences saved',
      })
    })
    .catch((err) => {
      next({ ...err, message: 'Could not save preferences' })
    })
})

module.exports = router
