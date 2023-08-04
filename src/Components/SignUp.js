import React from "react";
import logo from "../icons/chat_512.png";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
function SignUp({ toggleComponent }) {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={logo} alt="logo" className="welcome-logo" />
      </div>
      <div className="login-box">
        <p className="login-text">Login to your Account</p>
        <TextField
          id="standard-basic"
          label="Enter User Name"
          variant="outlined"
        />
        <TextField id="standard-basic" label="Enter Email" variant="outlined" />
        <TextField
          type="password"
          id="outlined-password-input"
          label="password"
          autoComplete="current-password"
        />
        <Button variant="outlined">SIGN UP</Button>
        <p className="tog">
          Already have an account?{" "}
          <Link to="#" onClick={toggleComponent}>
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignUp;
