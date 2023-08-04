const express = require("express");
const UserModel = require("../modals/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");

const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });
  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    console.log(response);
    res.json(response);
  } else {
    res.status(401).send("Invalid user name or password");
  }
});
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Request Body:", req.body);
  if (!name || !email || !password) {
    return res.status(400).send("All necessary input fields are not filled");
  }

  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    return res.status(409).send("User already exists");
  }

  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    return res.status(409).send("Username already exists");
  }

  const user = await UserModel.create({ name, email, password });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).send("Registration Error");
  }
});
const fetchUserController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await UserModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});
module.exports = { loginController, registerController, fetchUserController };
