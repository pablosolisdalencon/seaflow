// IEEE Trace: [REQ-PROC-01] | [US-401] | [Entity: procedimientos]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Procedimiento = sequelize.define('Procedimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    version: {
        type: DataTypes.STRING(10)
    },
    last_update: {
        type: DataTypes.DATEONLY
    },
    area_id: {
        type: DataTypes.INTEGER
    },
    file_path: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'procedimientos',
    timestamps: true
});

module.exports = Procedimiento;
