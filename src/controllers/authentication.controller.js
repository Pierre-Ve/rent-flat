import { body } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { User } from "../db/sequelize.js";
import { privateKey } from "../auth/private_key.js";

const loginRouteValidation = [
  body("username")
    .isString()
    .notEmpty()
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (!user) {
          return Promise.reject("The username or password is incorrect.");
        }
      });
    }),
  body("password")
    .isString()
    .notEmpty()
    .custom((value, { req }) => {
      return User.findOne({ where: { username: req.body.username } }).then(
        (user) => {
          return bcrypt
            .compare(value, user.password)
            .then((isPasswordValid) => {
              if (!isPasswordValid) {
                return Promise.reject("The username or password is incorrect.");
              }
            });
        }
      );
    }),
  validationMiddleware,
];

const login = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "24h",
      });
      return res.json({ data: user, token });
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
