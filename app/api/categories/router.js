const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const {
  getAllCategories,
  addCategory,
  updateCategoryById,
} = require("./controller");

// router.get("/categories", auth, function (req, res) {
//   res
//     .status(200)
//     .json({ message: "Welcome to Aria Bookstore Categories", data: req.user });
// });
router.get("/categories", auth, getAllCategories);
router.post("/categories", auth, addCategory);
router.put("/categories/:id", auth, updateCategoryById);

module.exports = router;
