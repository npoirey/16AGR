bcrypt = require('bcrypt-nodejs');

const password = bcrypt.hashSync('password');

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('users_preferences').insert(
      {
        user_id: 1,
        use_local_time: false,
      }),
    knex('users_preferences').insert(
      {
        user_id: 2,
        use_local_time: true,
      }),
  ]);
};
