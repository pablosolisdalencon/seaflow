// IEEE Trace: [REQ-REPT-01] | [US-AUD-01] | [Entity: hallazgos]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Hallazgo = sequelize.define('Hallazgo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    auditoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    severity: {
        type: DataTypes.ENUM('CRITICA', 'MAYOR', 'MENOR', 'OBSERVACION', 'N/A')
    },
    status: {
        type: DataTypes.ENUM('Cumple', 'No Cumple', 'Abierto', 'Cerrado'),
        defaultValue: 'Abierto'
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'hallazgos',
    timestamps: true
});

module.exports = Hallazgo;
