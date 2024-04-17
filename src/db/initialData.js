import { sequelize, User } from "./sequelize.js";
import bcrypt from "bcrypt";

sequelize.sync({ force: true }).then(() => {
  console.log("INIT DB");
  bcrypt.hash("password", 10).then((hash) => {
    User.create({
      username: "admin",
      admin: true,
      password: hash,
    }).then((user) => {
      console.log(user.toJSON());
    });
    User.create({
      username: "pierre",
      admin: false,
      password: hash,
    }).then((user) => {
      console.log(user.toJSON());
    });
  });
  console.log('La base de donnée "flatRental" a bien été synchronisée.');
});
