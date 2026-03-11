const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const EstacionInfa = sequelize.define('EstacionInfa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  infa_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false // E1, E2, ...
  },
  ph: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  redox: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  mo: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

module.exports = EstacionInfa;
