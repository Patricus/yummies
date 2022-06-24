"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Businesses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(95),
      },
      description: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.STRING(95),
      },
      city: {
        type: Sequelize.STRING(35),
      },
      state: {
        type: Sequelize.STRING(15),
      },
      zipCode: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Businesses");
  },
};
