exports.seed = (knex) =>
  // Inserts seedTestDb entries
  knex('users_preferences').insert([
    {
      user_id: 1,
      use_local_time: false,
    },
    {
      user_id: 2,
      use_local_time: true,
    },
    {
      user_id: 3,
      use_local_time: false,
    },
  ])
