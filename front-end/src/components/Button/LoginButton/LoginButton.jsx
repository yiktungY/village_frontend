import "./LoginButton.scss";
import { NavLink } from "react-router-dom";
// const SERVER_URL = "http://localhost:8080";

function LoginButton() {
  return (
    <div className="login">
      <NavLink to="/loginWithGoogle">Log in / Create a new Account</NavLink>
    </div>
  );
}

export default LoginButton;
