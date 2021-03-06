import bcrypt from 'bcrypt-nodejs'
import express from 'express'
import Promise from 'bluebird'
import { loginRequired, adminRequired } from '../middlewares/authorisations'
import UserPreference from '../models/UserPreference'
import User from '../models/User'
import { bookshelf } from '../models/database'
import { validatorFactory as v } from '../core/validator/express-ajv-validator'
import { conflict, badRequest, created } from '../core/responses'
import logger from '../core/logger'

const router = express.Router()

/**
 * Service 001 - New user creation
 */
router.post('/create', adminRequired, v('001_in'), (req, res, next) => {
  logger.info('Creating new user')
  if (!req.body.password || req.body.password.length < 8 || req.body.password.length > 120) {
    return badRequest(next, 'Password need to have between 8 to 120 characters')
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
          .catch((err1) => {
            logger.error('failed to create user', err1)
            next(err1)
          })
      })
    })
    .catch((err) => {
      logger.error('failed to create user', err)
      next(err)
    })
})

/**
 * Service 002 - Delete user
 */
router.delete('/', adminRequired, v('002_in'), (req, res, next) => {
  const request = req.body
  if (request.includes(req.user.id)) {
    return badRequest(next, 'Can\'t delete your own account')
  }
  const results = []
  bookshelf.transaction((t) =>
      Promise.map(req.body, (userId) =>
        User.forge({ id: userId })
          .destroy({ transacting: t, require: true })
          .then(() => (
            results.push({
              id: userId,
              status: 'SUCCESS',
            })
          ))
          .catch((err) => {
            logger.warn(`Failed to delete user ${userId} :`, err.message)
            logger.debug(`Failed to delete user ${userId} :`, err)
            results.push({
              id: userId,
              status: 'ERROR',
            })
          }),
      ))
    .then(() => {
      logger.info('Deleted users :', results)
      res.status(results.some((result) => result.status !== 'SUCCESS') ? 500 : 200).send(results)
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
