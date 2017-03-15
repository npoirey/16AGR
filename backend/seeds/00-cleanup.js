/* eslint-disable prefer-template */
const sequences = [
  'users',
]

exports.seed = (knex) =>
  knex('users_preferences').truncate().del()
    .then(() => {
      let resetSequencesCommand = ''
      sequences.forEach((sequence) => {
        if (knex.client.config.client === 'sqlite3') {
          resetSequencesCommand += 'UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME=\'' + sequence + '\';'
        } else if (knex.client.config.client === 'pg') {
          resetSequencesCommand += 'ALTER SEQUENCE ' + sequence + '_id_seq RESTART WITH 1;'
        }
      })
      return knex.schema.raw(resetSequencesCommand)
    })
    .then(() => knex('users').del())
    .then(() => knex('events').truncate().del())
