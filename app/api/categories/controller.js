const { Category } = require("../../db/models");

console.log(Category);

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      // req.user is the user object that we set in the auth middleware
      const categories = await Category.findAll({
        where: {
          userId: req.user.id,
        },
        attributes: ["id", "name", "userId"],
      });
      return res.status(200).json({ message: "Success", data: categories });
    } catch (error) {
      next(error);
    }
  },

  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "Name is required" });

      const isCategoryExist = await Category.findOne({ where: { name: name } });
      if (isCategoryExist)
        return res.status(400).json({ message: "Category already exist" });

      const newCategory = await Category.create({
        name,
        userId: req.user.id,
      });

      return res.status(201).json({ message: "Success", data: newCategory });
    } catch (error) {
      next(error);
    }
  },
};
