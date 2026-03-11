// IEEE Trace: [REQ-PERM-01] | [US-203] | [Entity: concesiones_maritimas]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const ConcesionMaritima = sequelize.define('ConcesionMaritima', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    decreto_number: {
        type: DataTypes.STRING(50)
    },
    expiry_date: {
        type: DataTypes.DATEONLY
    },
    status_tramite: {
        type: DataTypes.STRING(100)
    },
    solicitado: {
        type: DataTypes.STRING
    },
    inicio_tramite: {
        type: DataTypes.DATEONLY
    },
    num_tramite: {
        type: DataTypes.STRING
    },
    resolucion: {
        type: DataTypes.STRING
    },
    objeto: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'concesiones_maritimas',
    timestamps: true
});

module.exports = ConcesionMaritima;
