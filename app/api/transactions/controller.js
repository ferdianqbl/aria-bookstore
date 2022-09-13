const { DetailTransaction, Transaction, User } = require("../../db/models");

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      const { keyword } = req.query;

      // req.user is the user object that we set in the auth middleware
      let conditions = {
        userId: req.user.id,
      };
      if (keyword)
        conditions = { ...conditions, invoice: { [Op.like]: `%${keyword}%` } };

      const transactions = await Transaction.findAll({
        where: {
          ...conditions,
        },
        include: [
          { model: DetailTransaction },
          { model: User, attributes: ["name", "email"] },
        ],
      });

      if (transactions.length < 1)
        return res.status(404).json({ message: "No transactions found" });

      return res.status(200).json({ message: "Success", data: transactions });
    } catch (error) {
      next(error);
    }
  },
};
