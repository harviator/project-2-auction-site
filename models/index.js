const User= require('./User');
const Merchandise = require('./Merchandise');
const Posting = require('./Posting');

Merchandise.belongsToMany(User, {
  through: {
    model: Posting,
    unique: false
  },
})

User.belongsToMany(Merchandise, {
  through: {
    model: Posting,
    unique: false
  },
})

module.exports = {
  User,
  Merchandise,
  Posting
}
