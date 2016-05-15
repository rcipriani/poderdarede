"use strict";

module.exports = function(sequelize, DataTypes) {
    var Lancamento = sequelize.define("Lancamento", {
        id: DataTypes.INTEGER,
        descricao: DataTypes.STRING,
        valor: DataTypes.INTEGER,
        data: DataTypes.DATE,
        tipo: DataTypes.INTEGER
    }, {
            classMethods: {

            }
        });

    return Lancamento;
};