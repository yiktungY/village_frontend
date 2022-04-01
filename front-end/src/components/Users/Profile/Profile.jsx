import "./Profile.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const SERVER_URL = "http://localhost:8080";

function Profile() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  //login function
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
    <div>
      {userInfo && <div className="updatedEffect">Profile Updated</div>}
      <h1>Profile</h1>
      <img src={userInfo.avatar_url} alt="UserIcon" />
      <div>Display Name: {userInfo.displayName}</div>
      <div>First Name: {userInfo.familyName}</div>
      <div>Last Name: {userInfo.givenName}</div>
      <div>Rating: {userInfo.rating}</div>
      <div>Done Case: {userInfo.doneCase}</div>
      <div>Age: {userInfo.age}</div>
      <div>Address: {userInfo.address}</div>
      <div>Account create at {userInfo.updated_at}</div>

      {isLoggedIn && (
        <NavLink to={`/updateProfile/${userInfo.id}`}>Edit Profile</NavLink>
      )}
    </div>
  );
}

export default Profile;
