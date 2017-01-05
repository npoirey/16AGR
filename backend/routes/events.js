import express from 'express'
import Event from '../models/Event'
import { loginRequired } from '../middlewares/authorisations'

const router = express.Router()

router.get('/', loginRequired, (req, res) => {
  Event.fetchAll().then((events) => {
    res.send(events)
  })
})

module.exports = router
