// IEEE Trace: [REQ-CAP-02] | [US-4.2] | [Entity: registros_capacitacion]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const RegistroCapacitacion = sequelize.define('RegistroCapacitacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capacitacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    asistencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    nota: {
        type: DataTypes.DECIMAL(4, 2)
    },
    fecha_registro: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'registros_capacitacion',
    timestamps: true,
    underscored: true
});

module.exports = RegistroCapacitacion;
