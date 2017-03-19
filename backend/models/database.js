const knex = require('knex')
const bs = require('bookshelf')

const config = require('../knexfile')[process.env.NODE_ENV || 'development']

const db = knex(config)

// eslint-disable-next-line import/prefer-default-export
export const bookshelf = bs(db)

bookshelf.plugin([
  'bookshelf-cascade-delete',
  'bookshelf-camelcase',
  'registry',
])

