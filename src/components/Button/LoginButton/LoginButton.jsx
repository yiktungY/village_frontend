import "./LoginButton.scss";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const ButtonLink = styled.button`
  background-color: transparent;
  border: 1px solid black;
  width: 3rem;
  height: 3rem;
`;

function LoginButton() {
  return (
    <ButtonLink> Log in / Create a new Account</ButtonLink>

    // <div className="login">
    //   <NavLink className="navLink LinkButton" to="/loginWithGoogle">
    //     Log in / Create a new Account
    //   </NavLink>
    // </div>
  );
}

export default LoginButton;
