const bcrypt = require('bcrypt-nodejs')

const password = bcrypt.hashSync('password')

exports.seed = (knex, Promise) => Promise.all([
  // Inserts seedTestDb entries
  knex('users').insert(
    {
      // id: 1,
      callsign: 'admin',
      email: 'admin@mail.com',
      password,
      admin: true,
    }),
  knex('users').insert(
    {
      // id: 2,
      callsign: 'user',
      email: 'user@mail.com',
      password,
      admin: false,
    }),
  knex('users').insert(
    {
      // id: 3,
      callsign: 'user2',
      email: 'user2@mail.com',
      password,
      admin: false,
    }),
])
