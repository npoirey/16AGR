exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.timestamps()
    table.text('callsign').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.boolean('admin').notNullable().defaultTo(false)

    table.index('id')
    table.index('callsign')
    table.index('email')
  })

exports.down = (knex) => knex.schema.dropTable('users').dropIndex(['id', 'callsign', 'email'])
