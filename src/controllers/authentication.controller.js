import { body } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { User } from "../db/sequelize.js";
import { privateKey } from "../auth/private_key.js";

const loginRouteValidation = [
  body("username").isString().notEmpty(),
  body("password").isString().notEmpty(),
  validationMiddleware,
];

const login = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (!user) {
        const message = "The username or password is incorrect.";
        res.status(400).json({ message });
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = "the username or password is incorrect.";
            return res.status(400).json({ message });
          }

          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "24h",
          });

          const message = `The user ${user.username} is now connected.`;
          return res.json({ message, data: user, token });
        });
    })
    .catch((error) => {
      const message =
        "An error occurred while trying to log in. Please try again.";
      return res.json({ message, data: error });
    });
};

const authenticationController = {
  loginRoute: [...loginRouteValidation, login],
};

export { authenticationController };
