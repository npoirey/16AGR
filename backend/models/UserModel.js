const bookshelf = require('./database');

const UserModel = bookshelf.Model.extend({
  tableName: 'users',
});

module.exports = UserModel;

