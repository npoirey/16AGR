const bookshelf = require('./database')

const Event = bookshelf.Model.extend({
  tableName: 'events',
})

module.exports = bookshelf.model('Event', Event)
