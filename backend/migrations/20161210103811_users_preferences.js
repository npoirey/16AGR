exports.up = (knex) =>
  knex.schema.createTable('users_preferences', (table) => {
    table.integer('user_id').unsigned().index().references('id')
      .inTable('users')
    table.timestamps()
    table.boolean('use_local_time').notNullable().defaultTo(false)
  })

exports.down = (knex) => knex.schema.dropTable('users_preferences').dropIndex('user_id')
