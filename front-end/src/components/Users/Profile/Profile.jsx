import "./Profile.scss";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
const SERVER_URL = "http://localhost:8080";

function Profile(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");

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

  const handelUpdate = (data) => {
    const newUpdateInfo = {
      age: data.age,
    };
    axios
      .put(`${SERVER_URL}/users/${userInfo.id}`, newUpdateInfo, {
        withCredentials: true,
      })
      .then((data) => {
        // setUserInfo(true);
        props.history.push("/");
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
      <div>Email: {userInfo.email}</div>
      <div>Display Name: {userInfo.displayName}</div>
      <div>First Name: {userInfo.givenName}</div>
      <div>Last Name: {userInfo.familyName}</div>
      <div>Rating: {userInfo.rating}</div>
      <div>Done Case: {userInfo.doneCase}</div>
      <div>Age: {userInfo.age}</div>
      <div>Address: {userInfo.address}</div>
      <div>Accounts create at {userInfo.updated_at}</div>

      {isLoggedIn && (
        <>
          {userInfo.age > 0 ? (
            <NavLink to={`/updateProfile/${userInfo.id}`}>Edit Profile</NavLink>
          ) : (
            <form onSubmit={handleSubmit(handelUpdate)}>
              <div>Age: </div>
              <input {...register("age", { required: "This is required" })} />
              <p>{errors.age?.message}</p>
              <button type="submit">Starting Your Journey</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
