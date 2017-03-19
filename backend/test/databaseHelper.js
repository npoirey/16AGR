import { bookshelf } from '../models/database'

const config = require('../knexfile')[process.env.NODE_ENV]

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
