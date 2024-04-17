import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { body } from "express-validator";
import { Accomodation, User } from "../db/sequelize.js";

const accomodationSchema = [
  body("title").isString().notEmpty(),
  body("condition").isString().optional(),
  validationMiddleware,
];

const create = (req, res) => {
  const accomodation = Accomodation.build(req.body);
  User.findByPk(req.userId).then((user) => {
    if (user.admin) {
      accomodation.userID = user.id;
      console.log(accomodation.toJSON());
      accomodation
        .save()
        .then((result) => {
          res.status(201).json({ data: result });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to created an accomodation" });
    }
  });
};

const accomodationController = {
  createAccomodation: [...accomodationSchema, create],
};

export { accomodationController };
