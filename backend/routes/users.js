import express from 'express'
import { loginRequired, adminRequired } from '../middlewares/authorisations'
import UserPreference from '../models/UserPreference'
import User from '../models/User'

const router = express.Router()

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

module.exports = router
