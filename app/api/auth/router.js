const express = require("express");
const router = express.Router();

const { login } = require("./controller");

/* GET home page. */
router.post("/auth/login", login);

module.exports = router;
