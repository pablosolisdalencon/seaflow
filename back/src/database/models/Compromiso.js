// IEEE Trace: [REQ-REPT-01] | [US-AUD-01] | [Entity: compromisos]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Compromiso = sequelize.define('Compromiso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hallazgo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action_plan: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.ENUM('PENDIENTE', 'CUMPLIDO', 'COMPLETADO', 'ATRASADO'),
        defaultValue: 'PENDIENTE'
    }
}, {
    tableName: 'compromisos',
    timestamps: true
});

module.exports = Compromiso;
