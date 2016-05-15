"use strict";

module.exports = function(sequelize, DataTypes) {
    var Captura = sequelize.define("Captura", {
        chamadaId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            primaryKey: true,
            type: DataTypes.STRING
        }
    }, {
        classMethods: {

        }
    });

    return Captura;
};
