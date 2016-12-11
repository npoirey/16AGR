exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('users').truncate(),
    knex('events').truncate(),
  ]);
};
