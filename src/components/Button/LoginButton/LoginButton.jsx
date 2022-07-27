import "./LoginButton.scss";
import { NavLink } from "react-router-dom";

// const ButtonLink = styled.button`
//   background-color: transparent;
//   border: 1px solid black;
//   width: 3rem;
//   height: 3rem;
// `;

function LoginButton() {
  return (
    <button> Log in / Create a new Account</button>

    // <div className="login">
    //   <NavLink className="navLink LinkButton" to="/loginWithGoogle">
    //     Log in / Create a new Account
    //   </NavLink>
    // </div>
  );
}

export default LoginButton;
