"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        options.tableName = "Users";
        return queryInterface.bulkInsert(
            options,
            [
                {
                    email: "demo@user.io",
                    username: "Demo User",
                    hashedPassword: bcrypt.hashSync("password"),
                },
                {
                    email: "user1@user.io",
                    username: "John Doe",
                    hashedPassword: bcrypt.hashSync("password2"),
                },
                {
                    email: "user2@user.io",
                    username: "Jane Doe",
                    hashedPassword: bcrypt.hashSync("password3"),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Users",
            {
                username: { [Op.in]: ["Demo User", "John Doe", "Jane Doe"] },
            },
            {}
        );
    },
};
