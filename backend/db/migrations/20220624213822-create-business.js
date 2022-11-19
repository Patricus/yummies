"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            "Businesses",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                ownerId: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                title: {
                    allowNull: false,
                    type: Sequelize.STRING(95),
                },
                image: {
                    type: Sequelize.STRING,
                },
                description: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                address: {
                    allowNull: false,
                    type: Sequelize.STRING(95),
                },
                city: {
                    allowNull: false,
                    type: Sequelize.STRING(35),
                },
                state: {
                    allowNull: false,
                    type: Sequelize.STRING(15),
                },
                zipCode: {
                    allowNull: false,
                    type: Sequelize.STRING(10),
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            options
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Businesses", options);
    },
};
