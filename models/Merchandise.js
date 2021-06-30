const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Merchandise extends Model {}

Merchandise.init (
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year_released: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'merchandise'
  }
);

module.exports = Merchandise;