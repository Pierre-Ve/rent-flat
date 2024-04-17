const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "The username is already taken.",
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    children: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};

export { UserModel };
