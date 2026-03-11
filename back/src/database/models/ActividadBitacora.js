const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const ActividadBitacora = sequelize.define('ActividadBitacora', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_actividad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  actividad: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false // INFA, Certificación BAP, CCAA, etc.
  },
  evidencia_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resumen_actividad: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = ActividadBitacora;
