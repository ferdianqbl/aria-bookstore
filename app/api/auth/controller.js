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
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!password)
        return res.status(403).json({ message: "Password is required" });

      if (password !== confirmPassword)
        return res
          .status(403)
          .json({ message: "Password and Confirm Password must be the same" });

      if (!name) return res.status(403).json({ message: "Name is required" });
      if (!email) return res.status(403).json({ message: "Email is required" });

      const isEmailExist = await User.findOne({ where: { email } });
      if (isEmailExist) return res.status(403).json({ message: "Email exist" });

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      // password doesn't return
      delete newUser.dataValues.password;
      return res
        .status(201)
        .json({ message: "User created successfully", data: newUser });
    } catch (error) {
      next(error);
    }
  },
};
