const bookshelf = require('./database')

require('./UserPreference.js')

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  preferences() {
    return this.hasOne('UserPreference')
  },
  isAdmin() {
    return this.get('admin')
  },
})

module.exports = bookshelf.model('User', User)

