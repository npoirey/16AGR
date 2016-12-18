const bookshelf = require('./database');

require('./User');

const UserPreference = bookshelf.Model.extend({
  tableName: 'users_preferences',
  idAttribute: 'user_id',
  user: function () {
    return this.belongsTo('User');
  },
  //workaround for camelCase and idAttribute
  constructor: function (attributes, options) {
    if (attributes && attributes.userId) {
      attributes.user_id = attributes.userId;
      this.id = attributes.user_id;
    }

    if (options && options.parse === false) {
      bookshelf.Model.call(this, attributes, options);
    } else {
      var finalOptions = options ? options : {};
      finalOptions.parse = true;
      bookshelf.Model.call(this, attributes, finalOptions);
    }
  }
});


module.exports = bookshelf.model('UserPreference', UserPreference);

