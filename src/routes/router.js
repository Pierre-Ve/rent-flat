import express from "express";
import { authenticationController } from "../controllers/authentication.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello, world!",
  });
});

router.post("/login", ...authenticationController.loginRoute);

export { router };
