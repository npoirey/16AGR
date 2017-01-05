const bcrypt = require('bcrypt-nodejs')

const password = bcrypt.hashSync('password')

exports.seed = (knex, Promise) => Promise.all([
  // Inserts seed entries
  knex('users').insert(
    {
      id: 1,
      callsign: 'callsign1',
      email: 'test@mail.com',
      password,
      admin: true,
    }),
  knex('users').insert(
    {
      id: 2,
      callsign: 'callsign2',
      email: 'test2@mail.com',
      password,
      admin: false,
    }),
  knex('users').insert(
    {
      id: 3,
      callsign: 'callsign3',
      email: 'test3@mail.com',
      password,
      admin: false,
    }),
  knex('users').insert(
    {
      id: 4,
      callsign: 'callsign4',
      email: 'test4@mail.com',
      password,
      admin: false,
    }),
  knex('users').insert(
    {
      id: 5,
      callsign: 'callsign5',
      email: 'test5@mail.com',
      password,
      admin: false,
    }),
  knex('users').insert(
    {
      id: 6,
      callsign: 'callsign6',
      email: 'test6@mail.com',
      password,
      admin: false,
    }),
  knex('users').insert(
    {
      id: 7,
      callsign: 'callsign7',
      email: 'test7@mail.com',
      password,
      admin: false,
    }),
])
