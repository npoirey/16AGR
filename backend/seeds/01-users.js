exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('users').insert(
      {
        id: 1,
        email: 'test@mail.com',
        password: 'password',
      }),
  ]);
};
