const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

/* GET home page. */
router.get("/categories", auth, function (req, res) {
  // res.render("index", { title: "Aria Bookstore" });
  res
    .status(200)
    .json({ message: "Welcome to Aria Bookstore Categories", data: req.user });
});

module.exports = router;
