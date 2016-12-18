const bookshelf = require('./database');

require('./UserPreference.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  preferences: function () {
    return this.hasOne('UserPreference');
  }
});

module.exports = bookshelf.model('User', User);

