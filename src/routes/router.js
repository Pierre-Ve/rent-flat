import express from "express";
import { authenticationController } from "../controllers/authentication.controller.js";
import { accomodationController } from "../controllers/accomodation.controller.js";
import { bookingController } from "../controllers/booking.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello, world!",
  });
});

router.post("/login", ...authenticationController.loginRoute);

router.use(auth); // All the routes that need authentication must be placed after this middleware
router.post("/booking", ...bookingController.createBooking);
router.post("/accomodation", ...accomodationController.createAccomodation);

export { router };
