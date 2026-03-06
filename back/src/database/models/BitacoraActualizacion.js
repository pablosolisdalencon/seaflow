// IEEE Trace: [REQ-LOGS-01] | [US-402] | [Entity: bitacora_actualizacion]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const BitacoraActualizacion = sequelize.define('BitacoraActualizacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    target_entity: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'bitacora_actualizacion',
    timestamps: true
});

module.exports = BitacoraActualizacion;
