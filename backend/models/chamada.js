"use strict";

module.exports = function(sequelize, DataTypes) {
    var Chamada = sequelize.define("Chamada", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        slug: DataTypes.STRING,
        titulo: DataTypes.STRING,
        texto: DataTypes.TEXT,
        midia: DataTypes.STRING,
        aceitaInscricao: DataTypes.BOOLEAN
    }, {
            classMethods: {

            }
        });

    return Chamada;
};
