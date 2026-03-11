const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Certificacion = sequelize.define('Certificacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.ENUM('ASC', 'BAP', 'Orgánico', 'APL 1', 'APL 2'),
        allowNull: false
    },
    nombre_corto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.ENUM('Vigente', 'En Proceso', 'Vencido'),
        default: 'Vigente'
    },
    fecha_emision: {
        type: DataTypes.DATEONLY
    },
    fecha_vencimiento: {
        type: DataTypes.DATEONLY
    },
    version: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'certificaciones',
    timestamps: true,
    underscored: true
});

module.exports = Certificacion;
