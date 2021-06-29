const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Merchandise extends Model {}

Merchandise.init (
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primarykey: true,
      autoincrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year_released: {
      type: DataTypes.INTEGER,
      allowNull: false
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