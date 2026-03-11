// IEEE Trace: [REQ-CAP-01] | [US-4.1] | [Entity: capacitaciones]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Capacitacion = sequelize.define('Capacitacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    fecha_programada: {
        type: DataTypes.DATEONLY
    },
    instructor: {
        type: DataTypes.STRING(100)
    },
    tipo: {
        type: DataTypes.ENUM('Interna', 'Externa', 'Inducción'),
        defaultValue: 'Interna'
    }
}, {
    tableName: 'capacitaciones',
    timestamps: true,
    underscored: true
});

module.exports = Capacitacion;
