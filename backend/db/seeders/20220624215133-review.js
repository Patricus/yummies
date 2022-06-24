"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          businessId: 1,
          rating: 3,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 2,
          rating: 2,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 3,
          rating: 5,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 4,
          rating: 1,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 5,
          rating: 4,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 6,
          rating: 3,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 7,
          rating: 2,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 1,
          rating: 4,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 2,
          rating: 4,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 3,
          rating: 1,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 4,
          rating: 5,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 5,
          rating: 3,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 6,
          rating: 2,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessId: 7,
          rating: 1,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessId: 1,
          rating: 4,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          businessId: 2,
          rating: 3,
          comment: "It was ok",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Reviews", null, {});
  },
};
