import React from "react";
import logo from "../icons/chat_512.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WelcomeHome = () => {
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not authenticated");
    nav("/");
  }

  return (
    <div className={"welcome-container" + (lightTheme ? "" : " dark")}>
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 360 }}
        src={logo}
        alt="logo"
        className="welcome-logo"
      />
      <b>Hi, {userData.data.name} </b>
      <p>Chat with a vibe</p>
    </div>
  );
};

export default WelcomeHome;
