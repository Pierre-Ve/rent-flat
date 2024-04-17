import { sequelize, User } from "./sequelize.js";
import bcrypt from "bcrypt";

sequelize.sync({ force: true }).then(() => {
  console.log("INIT DB");
  bcrypt.hash("password", 10).then((hash) => {
    User.create({
      username: "admin",
      admin: true,
      password: hash,
      age: 25,
      height: 180,
      city: "Paris",
    }).then((user) => {
      console.log(user.toJSON());
    });
    User.create({
      username: "user",
      admin: false,
      password: hash,
      age: 30,
      children: 2,
      height: 170,
      city: "Lyon",
    }).then((user) => {
      console.log(user.toJSON());
    });
  });
  console.log("the database flatRental has been connected.");
});
