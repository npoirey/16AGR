exports.up = (knex) =>
  knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.timestamps()
    table.timestamp('date').notNullable()
    table.text('title').notNullable()
    table.text('short_description').notNullable()
    table.text('description')
    table.text('image_url')

    table.index('id')
  })

exports.down = (knex) => knex.schema.dropTable('events')

