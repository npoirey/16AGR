exports.seed = (knex) =>
  knex('users_preferences').truncate().del()
    .then(() => knex('users').del())
    .then(() => knex('events').truncate().del())
