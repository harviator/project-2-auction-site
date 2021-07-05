const User= require('./User');
const Merchandise = require('./Merchandise');
const Posting = require('./Posting');


User.hasMany(Posting, {
  as: 'poster',
  foreignKey: "user_id"
})

User.hasMany(Posting, {
  as: 'bidder',
  foreignKey: 'bidder_id'
})

Posting.belongsTo(User, {
  as: 'poster',
  foreignKey: 'user_id'
})

Posting.belongsTo(User, {
  as: 'bidder',
  foreignKey: 'bidder_id'
})

Posting.belongsTo(Merchandise, {
  foreignKey: "merchandise_id"
})

Merchandise.hasMany(Posting, {
  foreignKey: "merchandise_id"
})

module.exports = {
  User,
  Merchandise,
  Posting
}
