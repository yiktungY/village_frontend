import "./LoginButton.scss";
import { NavLink } from "react-router-dom";

function LoginButton() {
  return (
    <div className="login">
      <NavLink className="navLink LinkButton" to="/loginWithGoogle">
        Log in / Create a new Account
      </NavLink>
    </div>
  );
}

export default LoginButton;
