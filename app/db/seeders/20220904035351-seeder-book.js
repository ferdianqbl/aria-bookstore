"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "The Pragmatic Programmer",
          userId: 1,
          categoryId: 1,
          author: "Andrew Hunt",
          image: "/uploads/img-1.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Clean Code",
          userId: 3,
          categoryId: 2,
          author: "Robert C. Martin",
          image: "/uploads/img-2.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Clean Coder",
          userId: 3,
          categoryId: 3,
          author: "Robert C. Martin",
          image: "/uploads/img-3.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Refactoring",
          userId: 2,
          categoryId: 4,
          author: "Martin Fowler",
          image: "/uploads/img-4.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Myth",
          userId: 2,
          categoryId: 5,
          author: "Robert C. Martin",
          image: "/uploads/img-5.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Working Effectively with Legacy Code",
          userId: 1,
          categoryId: 6,
          author: "Michael C. Feathers",
          image: "/uploads/img-6.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
