import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { sequelize } from "./db/sequelize.js";
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

sequelize.sync().then(() => {
  console.log("Database synchronized");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
