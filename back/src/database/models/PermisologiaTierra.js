// IEEE Trace: [REQ-PERM-01] | [US-201] | [Entity: permisologia_tierra]
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const PermisologiaTierra = sequelize.define('PermisologiaTierra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    document_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    number: {
        type: DataTypes.STRING(50)
    },
    issue_date: {
        type: DataTypes.DATEONLY
    },
    expiry_date: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.ENUM('VIGENTE', 'VENCIDO', 'EN_TRAMITE'),
        defaultValue: 'VIGENTE'
    }
}, {
    tableName: 'permisologia_tierra',
    timestamps: true
});

module.exports = PermisologiaTierra;
