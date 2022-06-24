"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Businesses",
      [
        {
          ownerId: 1,
          title: "Demo Eats",
          description: "Fast food demo restaurant",
          address: "555 Demo Ave.",
          city: "Demo City",
          zipCode: "55555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          title: "Fake Eats",
          description: "Fast food fake restaurant",
          address: "556 Demo Ave.",
          city: "Demo City",
          zipCode: "55555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          title: "Very Fake Eats",
          description: "Fast food very fake restaurant",
          address: "557 Demo Ave.",
          city: "Demo City",
          zipCode: "55555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          title: "Eat Demoz",
          description: "Super food demoz restaurant",
          address: "565 Demoz Street",
          city: "Demo City",
          zipCode: "55555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          title: "Fake Foodz",
          description: "Fast fake foodz restaurant",
          address: "566 Demoz Street",
          city: "Demo City",
          zipCode: "55555",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          title: "Best Foods",
          description: "Best food demo restaurant",
          address: "777 Fake lane",
          city: "Fake City",
          zipCode: "77777",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          title: "Worst Foods",
          description: "Bad food demo restaurant",
          address: "778 Fake lane",
          city: "Fake City",
          zipCode: "77777",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Businesses", null, {});
  },
};
