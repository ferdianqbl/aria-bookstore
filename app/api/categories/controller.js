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
};
