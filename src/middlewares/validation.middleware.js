import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { validationMiddleware };
