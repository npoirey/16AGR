const bcrypt = require('bcrypt-nodejs');

const password = bcrypt.hashSync('password');

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('users').insert(
      {
        id: 1,
        email: 'test@mail.com',
        password: password,
        admin: true,
      }),
    knex('users').insert(
      {
        id: 2,
        email: 'test2@mail.com',
        password: password,
        admin: false,
      }),
  ]);
};
