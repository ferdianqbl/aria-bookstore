const { Op } = require("sequelize");
const { Book, Category, User } = require("../../db/models");
const fs = require("fs");
const path = require("path");

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword, category } = req.query;

      // req.user is the user object that we set in the auth middleware
      let conditions = {
        userId: req.user.id,
      }
      if (keyword)
        conditions = { ...conditions, title: { [Op.like]: `%${keyword}%` } }

      if (category)
        conditions = { ...conditions, categoryId: category }

      const books = await Book.findAll({
        where: {
          ...conditions
        },
        include: [
          { model: Category, attributes: ["id", "name"] },
          { model: User, attributes: ["id", "name", "email"] },
        ],
      });

      if (books.length < 1)
        return res.status(404).json({ message: "No books found" });

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

  deleteBook: async (req, res, next) => {
    try {
      const isBookExist = await Book.findOne({
        where: { id: req.params.id, userId: req.user.id },
      });

      if (!isBookExist)
        return res.status(404).json({ message: "Book not found" });

      // delete file image
      if (isBookExist.image) {
        const filePath = `../../../public${isBookExist.image}`;
        // console.log(__dirname);
        fs.unlinkSync(path.join(__dirname, filePath));
      }
      await isBookExist.destroy();

      return res.status(200).json({ message: "Success" });
    } catch (error) {
      next(error);
    }
  },
};
