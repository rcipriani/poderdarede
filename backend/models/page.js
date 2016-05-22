"use strict";

module.exports = function(sequelize, DataTypes) {
    var Page = sequelize.define("Page", {
        id: DataTypes.INTEGER,
        slug: DataTypes.STRING,
        titulo: DataTypes.STRING,
        texto: DataTypes.STRING,
        html: DataTypes.STRING,
        midia: DataTypes.STRING
    }, {
            classMethods: {

            }
        });

    return Page;
};
