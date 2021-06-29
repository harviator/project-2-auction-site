const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection.js');
const Merchandise = require('./Merchandise.js');


class Posting extends Model {}

Posting.init (
  {
    id: {
    type: DataTypes.INTEGER,
    alowNull: false,
    primarykey: true
    },
    quality: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [0,10]
      }
    },
    starting_bid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    current_bid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    acceptable_trades: {
      type: DataTypes.STRING,
      allowNull: false
    },
    merchandise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'merchandise',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posting',
  }
);

module.exports = Posting