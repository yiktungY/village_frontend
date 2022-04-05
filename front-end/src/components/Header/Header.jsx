import "./Header.scss";
import LoginButton from "../Button/LoginButton/LoginButton";
import LogoutButton from "../Button/LogoutButton/LogoutButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";

const SERVER_URL = "http://localhost:8080";

function Header() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
          setUserInfo(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loginFunction();
  }, []);

  return (
    <header className="header">
      <NavLink className="Nodisplay" to="/">
        <Button variant="outlined">HOME</Button>
      </NavLink>

      {isLoggedIn ? (
        <div className="header__info">
          <NavLink
            className="navLink header_user "
            to={`/profile/${userInfo.id}`}
          >
            <img className="icon" src={userInfo.avatar_url} alt="UserIcon" />
          </NavLink>
          <NavLink className="Nodisplay" to="/createpost">
            <Button variant="contained"> Create a Post</Button>
          </NavLink>
          {/* <NavLink
            className="navLink LinkButton header__createPost"
            to="/chatbox"
          >
            Chatbox
          </NavLink> */}

          <LogoutButton />
        </div>
      ) : (
        <>
          <NavLink className="Nodisplay" to="/loginWithGoogle">
            <Button variant="contained" disableElevation>
              Log in / Create a new Account
            </Button>
          </NavLink>
        </>
      )}
    </header>
  );
}

export default Header;
