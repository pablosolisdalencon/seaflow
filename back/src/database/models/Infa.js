// IEEE Trace: [REQ-INFA-01] | [US-301] | [Entity: infas]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Infa = sequelize.define('Infa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    report_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ph: {
        type: DataTypes.DECIMAL(5, 2)
    },
    redox: {
        type: DataTypes.DECIMAL(5, 2)
    },
    mo: {
        type: DataTypes.DECIMAL(5, 2)
    },
    status: {
        type: DataTypes.ENUM('AEROBICA', 'ANAEROBICA')
    }
}, {
    tableName: 'infas',
    timestamps: true
});

module.exports = Infa;
