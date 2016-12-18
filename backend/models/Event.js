var bookshelf = require('./database');

var Event = bookshelf.Model.extend({
  tableName: 'events',
});

module.exports = bookshelf.model('Event', Event);
