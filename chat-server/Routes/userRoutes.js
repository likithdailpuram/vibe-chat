const express = require("express");
const {
  loginController,
  registerController,
  fetchUserController,
} = require("../Controllers/userController");
const { protect } = require("../MiddleWare/authMiddleWare");
const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get("/fetchUsers", protect, fetchUserController);

module.exports = Router;
