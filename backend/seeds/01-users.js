const bcrypt = require('bcrypt-nodejs')

const password = bcrypt.hashSync('password')
const date = '2017-02-28 23:02:34.282000 +01:00'
const baseUser = {
  created_at: date,
  updated_at: date,
  password,
  admin: false,
}

exports.seed = (knex) =>
  // Inserts seedTestDb entries
  knex('users').insert([
    {
      ...baseUser,
      callsign: 'admin',
      email: 'admin@mail.com',
      admin: true,
    },
    {
      ...baseUser,
      callsign: 'user',
      email: 'user@mail.com',
    },
    {
      ...baseUser,
      callsign: 'user2',
      email: 'user2@mail.com',
    },
    {
      ...baseUser,
      callsign: 'user3',
      email: 'user3@mail.com',
    },
    {
      ...baseUser,
      callsign: 'user4',
      email: 'user4@mail.com',
    },
  ])
