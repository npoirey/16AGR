const bookshelf = require('../models/database')
const config = require('../knexfile').test

function buildTestDb() {
  return bookshelf.knex.migrate.rollback(config)
    .then(() => bookshelf.knex.migrate.latest(config))
}

function seedTestDb() {
  return bookshelf.knex.seed.run(config)
}

module.exports = {
  buildTestDb,
  seedTestDb,
}
