// IEEE Trace: [REQ-PERM-01] | [US-202] | [Entity: concesiones_acuicultura]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const ConcesionAcuicultura = sequelize.define('ConcesionAcuicultura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigo_centro: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 8)
    },
    longitud: {
        type: DataTypes.DECIMAL(11, 8)
    },
    res_ex_number: {
        type: DataTypes.STRING(50)
    },
    expiry_date: {
        type: DataTypes.DATEONLY
    }
}, {
    tableName: 'concesiones_acuicultura',
    timestamps: true
});

module.exports = ConcesionAcuicultura;
