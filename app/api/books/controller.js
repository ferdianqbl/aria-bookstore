const { Op } = require("sequelize");
const { Book, Category, User } = require("../../db/models");

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword } = req.query;

      // req.user is the user object that we set in the auth middleware

      if (keyword) {
        const books = await Book.findAll({
          where: {
            userId: req.user.id,
            title: {
              [Op.like]: `%${keyword}%`,
            },
          },
          include: [
            { model: Category, attributes: ["id", "name"] },
            { model: User, attributes: ["id", "name", "email"] },
          ],
        });
        // console.log("books: ", books);
        if (books.length < 1)
          return res.status(404).json({ message: "Books not found" });

        return res.status(200).json({ message: "Success", data: books });
      }

      const books = await Book.findAll({
        where: {
          userId: req.user.id,
        },
        include: [
          { model: Category, attributes: ["id", "name"] },
          { model: User, attributes: ["id", "name", "email"] },
        ],
      });

      return res.status(200).json({ message: "Success", data: books });
    } catch (error) {
      next(error);
    }
  },
};
