const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user)
        return res
          .status(400)
          .json({ message: "User not found, Invalid Email" });

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid password" });

      // create token
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        "secret",
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "User signed in successfully", token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
