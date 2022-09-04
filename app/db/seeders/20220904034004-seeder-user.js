"use strict";
const bcrypt = require("bcrypt");
const hashPassword = bcrypt.hash("rahasia", 10, function (err, hash) {
  return hash;
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        password: hashPassword,
        email: "john@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        password: hashPassword,
        email: "jane@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Smith",
        password: hashPassword,
        email: "smith@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
