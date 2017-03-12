exports.seed = (knex) =>
  knex('users_preferences').truncate().del()
    .then(() => knex('users').del())
    .then(() => knex.schema.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'))
    .then(() => knex('events').truncate().del())
