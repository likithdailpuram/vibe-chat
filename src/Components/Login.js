import React, { useState } from "react";
import logo from "../icons/chat_512.png";
import { TextField, Button, Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
function Login({ toggleComponent }) {
  const [showLogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const loginHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data,
        config
      );
      console.log("Login : ", response);
      setLogInStatus({ msg: "Sucsess", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/user/register",
        data,
        config
      );
      console.log(response);
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Check if error.response exists before accessing its properties
        if (error.response.status === 405) {
          setLogInStatus({
            msg: "User with email ID already Exists",
            key: Math.random(),
          });
        } else if (error.response.status === 406) {
          setLogInStatus({
            msg: "User Name already taken, Please take another name",
            key: Math.random(),
          });
        } else {
          // Handle other status codes if needed
          console.log("Unexpected error status:", error.response.status);
        }
      } else {
        // Handle network errors or other issues
        console.log("Network error or server not reachable.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="logo" className="welcome-logo" />
        </div>

        {showLogin && (
          <div className="login-box">
            <p className="login-text">Login to your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
            />
            <TextField
              onChange={changeHandler}
              type="password"
              id="outlined-password-input"
              label="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
            />
            <Button variant="outlined" onClick={loginHandler} isLoading>
              Login
            </Button>
            <p className="tog">
              Don't have an account?
              <span
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showLogin && (
          <div className="login-box">
            <p className="login-text">Create your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              helperText=""
            />
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter Email"
              variant="outlined"
              color="secondary"
              name="email"
            />
            <TextField
              onChange={changeHandler}
              type="password"
              id="outlined-password-input"
              label="Password"
              autoComplete="current-password"
              color="secondary"
              name="password"
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={signUpHandler}
            >
              SIGN UP
            </Button>
            <p className="tog">
              Already have an account?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
            {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
