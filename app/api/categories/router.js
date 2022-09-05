const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const {
  getAllCategories,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("./controller");

router.get("/categories", auth, getAllCategories);
router.post("/categories", auth, addCategory);
router.put("/categories/:id", auth, updateCategoryById);
router.delete("/categories/:id", auth, deleteCategoryById);

module.exports = router;
