var bookshelf = require('./database');

var EventModel = bookshelf.Model.extend({
  tableName: 'events',
});

module.exports = EventModel;
