exports.seed = (knex, Promise) => Promise.all([
  knex('users').del(),
  knex('events').del(),
])
