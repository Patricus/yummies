"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        options.tableName = "Businesses";
        return queryInterface.bulkInsert(
            options,
            [
                {
                    ownerId: 1,
                    title: "Cody's Cafe",
                    image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
                    description:
                        "Long-standing neighborhood bar/mainstay providing American classics for breakfast, lunch & dinner.",
                    address: "4898 Hollister Ave",
                    city: "Santa Barbara",
                    state: "California",
                    zipCode: "93111",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ownerId: 2,
                    title: "Rusty's Pizza Parlor",
                    image: "https://www.rustyspizza.com/images/default-source/default-album/rspechero.jpg",
                    description:
                        "Family-friendly chain for traditional & specialty pizza, plus hot wings, sandwiches & desserts.",
                    address: "4880 Hollister Ave",
                    city: "Santa Barbara",
                    state: "California",
                    zipCode: "93111",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ownerId: 3,
                    title: "Kyle's Kitchen",
                    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
                    description:
                        "Relaxed eatery serving burgers, fries & craft beer while supporting special-needs organizations.",
                    address: "5723 Calle Real",
                    city: "Goleta",
                    state: "California",
                    zipCode: "93117",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ownerId: 1,
                    title: "La Hacienda",
                    image: "https://themenustar4.com/upload/2021-01-16/5160032b1cdf848.jpg",
                    description: "Super food demoz restaurant",
                    address: "298 Pine Ave",
                    city: "Goleta",
                    state: "California",
                    zipCode: "93117",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ownerId: 2,
                    title: "Lure Fish House",
                    image: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg",
                    description:
                        "Locally sourced seafood, wine & beer in an upmarket space with an oyster bar & a nautical theme.",
                    address: "3815 State St Suite G131",
                    city: "Santa Barbara",
                    state: "California",
                    zipCode: "93105",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ownerId: 3,
                    title: "Backyard Bowls",
                    image: "https://images.squarespace-cdn.com/content/v1/54ac31a9e4b0a068cecfa752/1427332016402-11EBGYSQLFNBGNC7BMEG/Backyard_Bowls_Downtown_089.jpg",
                    description:
                        "Eco-friendly eatery offering acai bowls, smoothies & more using all-natural & organic ingredients.",
                    address: "5668 Calle Real",
                    city: "Goleta",
                    state: "California",
                    zipCode: "93117",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    ownerId: 1,
                    title: "Chicken Ranch",
                    image: "https://static.wixstatic.com/media/fa06a5_4876682d3a594ec8a592b0d595b2c04a~mv2.jpg",
                    description:
                        "Local counter-serve BBQ chain offering mesquite-grilled chicken & tri-tip burritos & plates.",
                    address: "149 N Fairview Ave #2304",
                    city: "Goleta",
                    state: "California",
                    zipCode: "93117",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        options.tableName = "Businesses";
        return queryInterface.bulkDelete(options, null, {});
    },
};
