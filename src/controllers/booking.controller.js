import { Booking, Accomodation } from "../db/sequelize.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { body } from "express-validator";

const createBookingValidation = [
  body("accomodationId")
    .isInt({ min: 1 })
    .custom((value) => {
      return Accomodation.findByPk(value).then((accomodation) => {
        if (!accomodation) {
          return Promise.reject();
        }
      });
    })
    .withMessage("The accomodation does not exist"),
  validationMiddleware,
];

const create = (req, res) => {
  const { userId } = req;
  const { accomodationId } = req.body;

  const booking = Booking.build({
    userID: userId,
    accomodationID: accomodationId,
  });
  booking
    .save()
    .then((result) => {
      res.status(201).json({ data: result });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const bookingController = {
  createBooking: [...createBookingValidation, create],
};

export { bookingController };
