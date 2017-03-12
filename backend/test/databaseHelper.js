const bookshelf = require('../models/database')
const config = require('../knexfile').test

function buildTestDb() {
  return bookshelf.knex.migrate.rollback(config)
    .then(() => bookshelf.knex.migrate.latest(config))
}

function seedTestDb() {
  let resetSequenceCommand = ''
  if (config.client === 'sqlite3') {
    resetSequenceCommand = 'UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME=\'users\';'
  } else if (config.client === 'pg') {
    resetSequenceCommand = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
  }
  return bookshelf.knex.schema.raw(resetSequenceCommand)
    .then(() => bookshelf.knex.seed.run(config))
}

module.exports = {
  buildTestDb,
  seedTestDb,
}
