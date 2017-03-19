import { bookshelf } from './database'

const Event = bookshelf.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
})

module.exports = bookshelf.model('Event', Event)
