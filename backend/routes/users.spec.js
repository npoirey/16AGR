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
    describe('Service 001 POST /create', () => {
      it('should reject request', (done) => {
        guestSession
          .post('/users/create')
          .send(newUser)
          .expect(401, {
            status: 401,
            message: 'Login Required',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
    })

    describe('Service 002 DELETE /', () => {
      it('should reject request', (done) => {
        guestSession
          .delete('/users')
          .send([2])
          .expect(401, {
            status: 401,
            message: 'Login Required',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
    })
  })

  describe('With standard user', () => {
    let userSession
    beforeEach((done) => {
      userSession = session(app)
      userSession.post('/auth/login')
        .send({ username: 'user@mail.com', password: 'password' })
        .expect(200, done)
    })
    describe('Service 001 POST /create', () => {
      it('should reject request', (done) => {
        userSession
          .post('/users/create')
          .send(newUser)
          .expect(403, {
            status: 403,
            message: 'Admin Required',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
    })

    describe('Service 002 DELETE /', () => {
      it('should reject request', (done) => {
        userSession
          .delete('/users')
          .send([2])
          .expect(403, {
            status: 403,
            message: 'Admin Required',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
    })
  })

  describe('With admin user', () => {
    let adminSession
    beforeEach((done) => {
      adminSession = session(app)
      adminSession.post('/auth/login')
        .send({ username: 'admin@mail.com', password: 'password' })
        .expect(200, done)
    })

    describe('Service 001 POST /create', () => {
      it('Should warn in case of password too short', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, password: 'abc' })
          .expect(400, {
            status: 400,
            message: 'Password need to have between 8 to 120 characters',
          })
          .then(() => done())
          .catch((err) => done(err))
      })
      it('Should warn in case of password too long', (done) => {
        adminSession
          .post('/users/create')
          .send({ ...newUser, password: 'a'.repeat(121) })
          .expect(400, {
            status: 400,
            message: 'Password need to have between 8 to 120 characters',
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
          .then((response) => User.where('id', response.body.id).fetch())
          .then((user) => {
            expect(bcrypt.compareSync('password', user.get('password'))).to.be.true()
            expect(user.get('callsign')).to.eql(newUser.callsign)
            expect(user.get('email')).to.eql(newUser.email)
            done()
          })
          .catch((err) => done(err))
      })
    })

    describe('Service 002 DELETE /', () => {
      it('Should warn if user is trying to delete himself and don\'t delete anything', (done) => {
        adminSession
          .delete('/users')
          .send([1, 3])
          .expect(400, {
            status: 400,
            message: 'Can\'t delete your own account',
          })
          .then(() => User.fetchAll())
          .then((data) => {
            const users = data.models
            expect(users).to.have.lengthOf(5)
            done()
          })
          .catch((err) => done(err))
      })
      it('Should delete the users', (done) => {
        adminSession
          .delete('/users')
          .send([2, 3])
          .expect(200, [{ id: 2, status: 'SUCCESS' }, { id: 3, status: 'SUCCESS' }])
          .then(() => User.fetchAll())
          .then((data) => {
            const users = data.models
            expect(users).to.have.lengthOf(3)
            expect(users[0].get('id')).to.eql(1)
            expect(users[1].get('id')).to.eql(4)
            expect(users[2].get('id')).to.eql(5)
            done()
          })
          .catch((err) => done(err))
      })
      it('Should delete the users but warn for those in error', (done) => {
        adminSession
          .delete('/users')
          .send([2, 6])
          .expect(500, [{ id: 2, status: 'SUCCESS' }, { id: 6, status: 'ERROR' }])
          .then(() => User.fetchAll())
          .then((data) => {
            const users = data.models
            expect(users).to.have.lengthOf(4)
            expect(users[0].get('id')).to.eql(1)
            expect(users[1].get('id')).to.eql(3)
            expect(users[2].get('id')).to.eql(4)
            expect(users[3].get('id')).to.eql(5)
            done()
          })
          .catch((err) => done(err))
      })
    })
  })
})

