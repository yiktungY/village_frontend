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
  }, [isLoggedIn]);

  return (
    <header className="header">
      <NavLink className="navLink fontStyle" activeClassName="activeheader" to="/">
        <div className="header__logo">
          Vi<span className="header__logo--special">ll</span>ge
        </div>
      </NavLink>

      {isLoggedIn ? (
        <div className="header__info">
          <NavLink
            className="navLink header_user"
            activeClassName="activeheader"
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
