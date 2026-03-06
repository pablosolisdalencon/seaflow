// IEEE Trace: [REQ-REPT-01] | [US-AUD-01] | [Entity: auditorias]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Auditoria = sequelize.define('Auditoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('INTERNA', 'EXTERNA'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    auditor_name: {
        type: DataTypes.STRING(100)
    },
    status: {
        type: DataTypes.ENUM('PLANIFICADA', 'EN_CURSO', 'FINALIZADA'),
        defaultValue: 'PLANIFICADA'
    }
}, {
    tableName: 'auditorias',
    timestamps: true
});

module.exports = Auditoria;
