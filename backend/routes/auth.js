import express from 'express'
import passport from '../middlewares/passport'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(req.user)
})

router.post('/login', passport.authenticate('local'), (req, res) => res.json({ success: true, message: 'Logged in', payload: req.user }))

router.get('/logout', (req, res) =>
  req.session.destroy(() => res.redirect('/')))

module.exports = router
