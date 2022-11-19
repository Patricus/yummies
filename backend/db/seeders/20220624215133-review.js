"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        options.tableName = "Reviews";
        return queryInterface.bulkInsert(
            options,
            [
                {
                    userId: 1,
                    businessId: 1,
                    rating: 3,
                    comment: "It was ok, pictures make it seem more fancy than it actually is.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    businessId: 2,
                    rating: 2,
                    comment: "If you want better pizza go to Topper's.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 3,
                    businessId: 3,
                    rating: 5,
                    comment:
                        "The food is great, all organic. I even met Kyle! This family owned business is one of the best.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    businessId: 4,
                    rating: 1,
                    comment: "Didn't get what I thought I ordered.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    businessId: 5,
                    rating: 4,
                    comment: "I love seafood and if you do too, this is the place to go.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 3,
                    businessId: 6,
                    rating: 3,
                    comment: "Just a good bowl of fruits, nice on a hot day.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    businessId: 7,
                    rating: 4,
                    comment:
                        "If you haven't been here yet you should. Tender chicken never disappoints.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    businessId: 1,
                    rating: 4,
                    comment: "Loved the food and atmosphere!",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 3,
                    businessId: 2,
                    rating: 4,
                    comment: "Rusty's is great. How can you not like good old pizza!",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    businessId: 3,
                    rating: 4,
                    comment: "Kyle's never lets me down.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    businessId: 4,
                    rating: 5,
                    comment: "Great mexican food. If I could give more stars I would.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 3,
                    businessId: 5,
                    rating: 3,
                    comment: "Food was great, but the wait was long.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    businessId: 6,
                    rating: 4,
                    comment: "Very refreshing, will go again.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,
                    businessId: 7,
                    rating: 3,
                    comment: "It was ok",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 3,
                    businessId: 1,
                    rating: 4,
                    comment: "My only complaint it there isn't enough seating.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    businessId: 2,
                    rating: 3,
                    comment: "Standard pizza, nothing special. Not that that's a bad thing.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        options.tableName = "Reviews";
        return queryInterface.bulkDelete(options, null, {});
    },
};
