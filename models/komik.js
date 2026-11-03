const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const komik = sequelize.define('komik', {
        id: {
            type: DataTypes.INTEGER, // Diperbaiki dari DataTypes, INTEGER
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'komik',       // Memaksa mengarah ke tabel 'komik'
        freezeTableName: true,     // Mencegah penambahan huruf 's' otomatis
        timestamps: false          // Mencegah pencarian kolom createdAt/updatedAt
    });

    return komik;
};