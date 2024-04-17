const AccomodationModel = (sequelize, DataTypes) => {
  return sequelize.define("Accomodation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
      unique: {
        msg: "This title is already taken.",
      },
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    condition: {
      type: DataTypes.TEXT,
      required: false,
    },
  });
};

export { AccomodationModel };
