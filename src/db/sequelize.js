import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
import { AccomodationModel } from "../models/accomodation.model.js";
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
const Accomodation = AccomodationModel(sequelize, DataTypes);
Accomodation.belongsTo(User, { foreignKey: "userID" });
User.hasMany(Accomodation);

export { sequelize, User, Accomodation };
