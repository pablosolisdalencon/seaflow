const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Carta = sequelize.define('Carta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correlativo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  referencia: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  remitente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'Resuelta'),
    defaultValue: 'Pendiente'
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: true
  },
  plazo_respuesta: {
    type: DataTypes.DATE,
    allowNull: true
  },
  evidencia_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Carta;
