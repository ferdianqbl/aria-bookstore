const { DetailTransaction, Transaction, Book } = require("../../db/models");
const { Op } = require("sequelize");
const sequelize = require("../../db/models").sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const { payload } = req.body;
      const { id } = req.user;

      const transaction = await Transaction.create(
        {
          invoice: `T-${Math.floor(10000000 + Math.random() * 90000000)}`,
          date: new Date(),
          userId: id,
        },
        { transaction: t }
      );

      let errorBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkingBook = await Book.findOne({
          where: {
            id: payload[i].bookId,
            userId: id,
          },
        });

        // add field create detail transaction
        payload[i].transactionId = transaction.id;
        payload[i].userId = id;
        payload[i].titleBook = checkingBook?.title;
        payload[i].imageBook = checkingBook?.image;
        payload[i].priceBook = checkingBook?.price;
        payload[i].quantityBook = payload[i].quantity;

        updateStock.push({
          id: payload[i].bookId,
          stock: checkingBook?.stock - payload[i]?.quantity,
          userId: id,
        });

        if (payload[i]?.quantity > checkingBook?.stock)
          errorBookIdStock.push(
            `${payload[i]?.quantity} - ${checkingBook?.stock}`
          );

        if (!checkingBook) errorBookIdNotFound.push(payload[i]?.bookId);
      }

      if (errorBookIdStock.length > 0)
        return res.status(400).json({
          message: `Book stock is not enough with id: ${errorBookIdStock.join(
            ", "
          )} and user: ${id}`,
        });

      if (errorBookIdNotFound.length > 0)
        return res.status(400).json({
          message: `Book id not found: ${errorBookIdNotFound.join(
            ", "
          )} and user: ${id}`,
        });

      await Book.bulkCreate(
        updateStock,
        {
          updateOnDuplicate: ["stock"],
        },
        { transaction: t }
      );

      console.log(payload);

      const detailTransaction = await DetailTransaction.bulkCreate(payload, {
        transaction: t,
      });

      await t.commit();

      res.status(201).json({
        message: "Checkout success",
        data: detailTransaction,
      });
    } catch (error) {
      if (t) await t.rollback();
      next(error);
    }
  },
};
