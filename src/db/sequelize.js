import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
import { AccomodationModel } from "../models/accomodation.model.js";
import { BookingModel } from "../models/booking.model.js";
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
const Booking = BookingModel(sequelize, DataTypes);

Accomodation.belongsTo(User, { foreignKey: "userID" });
User.hasMany(Accomodation, { foreignKey: "userID" });
Booking.belongsTo(User, { foreignKey: "userID" });
User.hasMany(Booking, { foreignKey: "userID" });
Booking.belongsTo(Accomodation, { foreignKey: "accomodationID" });

export { sequelize, User, Accomodation, Booking };
