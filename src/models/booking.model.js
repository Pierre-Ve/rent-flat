import { User, Accomodation } from "../db/sequelize.js";

const BookingModel = (sequelize, DataTypes) => {
  return sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    accomodationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Accomodation,
        key: "id",
      },
    },
  });
};

export { BookingModel };
