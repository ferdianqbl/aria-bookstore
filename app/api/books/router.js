const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const { getAllBooks, addBook } = require("./controller");

router.get("/books", auth, getAllBooks);
router.post("/books", auth, addBook);

module.exports = router;
