import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { router } from "./routes/router.js";

const port = process.env.PORT || 3000;

const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use("/api", router)
  .use("*", (req, res) => {
    res.status(404).json({
      message: "Not Found",
    });
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
