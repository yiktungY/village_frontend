import "./LoginWithGoolge.scss";
import "animate.css";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Login from "../Login/Login";
import SignUp from "../Signup/SignUp";
const SERVER_URL = "http://localhost:8080";

function LoginWithGoolge(props) {
  useEffect(() => {
    document.title = "Login";
  });
  return (
    <div className="login">
      {/* <h1 className="animate__animated animate__bounce login__header">
        Login with Google in one step
      </h1>
      <div className="login__box">
        <div className="login__box--text border">
          <Button
            variant="contained"
            className="navLink"
            href={`${SERVER_URL}/auth/google`}
          >
            Login
          </Button>
        </div>
        <div className="login__box--text">
          <h2>First time? </h2>
          <Button variant="text" href={`${SERVER_URL}/auth/google`}>
            Try to create a new account with google
          </Button>
        </div>
      </div> */}

      <SignUp />
      <h2>login</h2>
      <Login props={props} />
    </div>
  );
}

export default LoginWithGoolge;
