const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/auth", function (req, res) {
  // res.render("index", { title: "Aria Bookstore" });
  res.status(200).json({ message: "Welcome to Aria Bookstore Authentication" });
});

module.exports = router;
