const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/connection.js');
const Merchandise = require('./Merchandise.js');


class Posting extends Model {}

Posting.init (
  {
    id: {
    type: DataTypes.INTEGER,
    alowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
      defaultValue: 0,
      validate: {
        notEmpty: true
      }
    },
    current_bid: {
      type: DataTypes.INTEGER,
    },
    bidder_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
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