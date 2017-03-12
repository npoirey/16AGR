require('babel-register')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  },
  test_pg: {
    client: 'pg',
    connection: {
      host: 'db',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  },
  test: {
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
  },
}
