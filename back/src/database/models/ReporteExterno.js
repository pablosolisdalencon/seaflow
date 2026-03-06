// IEEE Trace: [REQ-REPT-01] | [US-REP-01] | [Entity: reportes_externos]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const ReporteExterno = sequelize.define('ReporteExterno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    system: {
        type: DataTypes.ENUM('SINADER', 'SIDREP', 'LIMPIEZA_PLAYAS', 'RETC'),
        allowNull: false
    },
    period: {
        type: DataTypes.STRING(20)
    },
    submission_date: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.ENUM('PENDIENTE', 'ENVIADO', 'CORREGIDO'),
        defaultValue: 'PENDIENTE'
    }
}, {
    tableName: 'reportes_externos',
    timestamps: true
});

module.exports = ReporteExterno;
