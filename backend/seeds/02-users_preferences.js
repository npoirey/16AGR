exports.seed = (knex, Promise) => Promise.all([
  // Inserts seedTestDb entries
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
])
