const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/categories", function (req, res) {
  // res.render("index", { title: "Aria Bookstore" });
  res.status(200).json({ message: "Welcome to Aria Bookstore Categories" });
});

module.exports = router;
