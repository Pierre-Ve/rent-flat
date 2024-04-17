import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
dotenv.config();

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      })
    : new Sequelize(process.env.DATABASE_URL);

const User = UserModel(sequelize, DataTypes);

export { sequelize, User };
