const express = require("express");
const User = require("../model/User");
const { loginValidation, regValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const app = express();

const auth = () => {
  // REGISTER
  app.post("/register", async (req, res) => {
    //For validating the data before creating a user.
    const { error } = regValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("Email already exists!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //Creating new user
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    console.log(user);

    //Save new user
    try {
      const savedUser = await user.save();
      // res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  // LOGIN
  app.post("/login", async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE ADD A USER
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // chk if new user already in db
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is wrong");

    // chk if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  });
};

module.exports = auth;
