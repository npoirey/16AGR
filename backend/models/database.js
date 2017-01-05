const knex = require('knex')

const config = require('../knexfile')[process.env.NODE_ENV || 'development']

const db = knex(config)

const bookshelf = require('bookshelf')(db)

bookshelf.plugin([
  'bookshelf-camelcase',
  'registry',
])


module.exports = bookshelf
