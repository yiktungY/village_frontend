import "./Header.scss";
import LoginButton from "../Button/LoginButton/LoginButton";
import LogoutButton from "../Button/LogoutButton/LogoutButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
      <NavLink to="/">HOME</NavLink>
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      {isLoggedIn && (
        <div className="personalInfo">
          <NavLink to="/createpost">Create a Post</NavLink>
          <NavLink to={`/profile/${userInfo.id}`}>
            <img className="icon" src={userInfo.avatar_url} alt="UserIcon" />
            <div>Display Name: {userInfo.displayName}</div>
            <div>Rating: {userInfo.rating}</div>
            <div>Done Case: {userInfo.doneCase}</div>
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
