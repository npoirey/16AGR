exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('events').del(),
  ]);
};
