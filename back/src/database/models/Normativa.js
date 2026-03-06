const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Normativa = sequelize.define('Normativa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    short_name: {
        type: DataTypes.STRING(255),
        unique: true
    },
    entity: {
        type: DataTypes.STRING(100)
    },
    thematic: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'normativas'
});

module.exports = Normativa;
