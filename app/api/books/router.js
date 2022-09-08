const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { getAllBooks, addBook, updateBookById } = require("./controller");

router.get("/books", auth, getAllBooks);
router.post("/books", auth, addBook);
router.put("/books/:id", auth, updateBookById);

module.exports = router;
