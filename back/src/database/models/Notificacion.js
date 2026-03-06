// IEEE Trace: [REQ-LOGS-01] | [US-102] | [Entity: notificaciones]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Notificacion = sequelize.define('Notificacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'notificaciones',
    timestamps: true
});

module.exports = Notificacion;
