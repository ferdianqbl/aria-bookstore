const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const { getTransactionList } = require("./controller");

router.get("/transactions", auth, getTransactionList);

module.exports = router;
