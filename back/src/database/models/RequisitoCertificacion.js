const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const RequisitoCertificacion = sequelize.define('RequisitoCertificacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    evidencia_requerida: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'requisitos_certificacion',
    timestamps: true,
    underscored: true
});

module.exports = RequisitoCertificacion;
