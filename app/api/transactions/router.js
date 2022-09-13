const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const {
  getTransactionList,
  getDetailTransactionList,
} = require("./controller");

router.get("/transactions", auth, getTransactionList);
router.get("/transactions/:id", auth, getDetailTransactionList);

module.exports = router;
