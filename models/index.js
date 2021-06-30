const User= require('./User');
const Merchandise = require('./Merchandise');
const Posting = require('./Posting');

// Merchandise.belongsToMany(User, {
//   through: {
//     model: Posting,
//     unique: false
//   },
// })

// User.belongsToMany(Merchandise, {
//   through: {
//     model: Posting,
//     unique: false
//   },
// })

Posting.belongsTo(User, {
  foreignKey: "user_id"
})

User.hasMany(Posting, {
  foreignKey: "user_id"
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
