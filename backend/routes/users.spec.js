/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt-nodejs'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import session from 'supertest-session'
import app from '../app'
import User from '../models/User'
import { buildTestDb, seedTestDb } from '../test/databaseHelper'

const expect = chai.expect
chai.use(dirtyChai)


describe('API /users', () => {
  const newUser = {
    callsign: 'test',
    password: 'password',
    passwordRepeat: 'password',
    email: 'test@mail.com',
    admin: true,
  }

  before((done) => {
    buildTestDb()
      .then(() => done())
      .catch((err) => done(err))
  })

  beforeEach((done) => {
    seedTestDb()
      .then(() => done())
      .catch((err) => done(err))
  })

  describe('With guest user', () => {
    let guestSession
    beforeEach(() => {
      guestSession = session(app)
    })
    describe('Service 001 /create', () => {
      it('should reject request', (done) => {
        guestSession
          .post('/users/create')
          .send(newUser)
          .expect(401, {
            error: true,
            message: 'Login Required',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
    })
  })

  describe('With admin user connected', () => {
    let adminSession
    beforeEach((done) => {
      adminSession = session(app)
      adminSession.post('/auth/login')
        .send({ username: 'admin@mail.com', password: 'password' })
        .expect(200, done)
    })

    describe('Service 001 /create', () => {
      it('Should warn in case of password too short', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, password: 'abc' })
          .expect(400, {
            status: 400,
            message: 'Password need to have between 8 to 30 characters',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
      it('Should warn in case of password too long', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, password: 'abcaueiaueiaeuiaueiaueiaueiaueiaueiaueiaueiauei' })
          .expect(400, {
            status: 400,
            message: 'Password need to have between 8 to 30 characters',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
      it('Should warn if passwords do not match', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, passwordRepeat: 'otherPassword' })
          .expect(400, {
            status: 400,
            message: 'Passwords do not match',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
      it('Should warn if callsign already exists', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, callsign: 'user' })
          .expect(409, {
            status: 409,
            message: 'Another user exists with this mail or callsign',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
      it('Should warn if email already exists', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, email: 'user@mail.com' })
          .expect(409, {
            status: 409,
            message: 'Another user exists with this mail or callsign',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
      it('Should save user and encrypt password', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser })
          .expect(201)
          .then((response) =>
            User.where('id', response.body.id).fetch()
              .then((user) => {
                expect(bcrypt.compareSync('password', user.get('password'))).to.be.true()
                expect(user.get('callsign')).to.eql(newUser.callsign)
                expect(user.get('email')).to.eql(newUser.email)
                done()
              })
          )
          .catch((err) => done(err))
      })
    })
  })
})

