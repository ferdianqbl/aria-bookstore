const express = require("express");
const router = express.Router();

const { login, register } = require("./controller");

/* GET home page. */
router.post("/auth/login", login);
router.post("/auth/register", register);

module.exports = router;
