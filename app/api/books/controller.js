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

  addBook: async (req, res, next) => {
    try {
      const { title, categoryId, author, image, published, price, stock } =
        req.body;

      if (
        !title ||
        !categoryId ||
        !author ||
        !image ||
        !published ||
        !price ||
        !stock
      ) {
        return res.status(400).json({ message: "Please fill all fields" });
      }

      const isCategoryExist = await Category.findOne({
        where: { id: categoryId },
      });

      if (!isCategoryExist)
        return res.status(400).json({ message: "Category not found" });

      const newBook = await Book.create({
        title,
        userId: req.user.id,
        categoryId,
        author,
        image,
        published,
        price,
        stock,
      });

      return res.status(201).json({ message: "Success", data: newBook });
    } catch (error) {
      next(error);
    }
  },

  updateBookById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, categoryId, author, image, published, price, stock } =
        req.body;

      const isBookExist = await Book.findOne({ where: { id } });

      if (!isBookExist)
        return res.status(404).json({ message: "Book not found" });

      const bookUpdated = await isBookExist.update({
        title,
        userId: req.user.id,
        categoryId,
        author,
        image,
        published,
        price,
        stock,
      });

      return res.status(200).json({ message: "Success", data: bookUpdated });
    } catch (error) {
      next(error);
    }
  },
};
