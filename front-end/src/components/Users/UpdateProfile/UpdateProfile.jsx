import "./UpdateProfile.scss";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoginButton from "../../Button/LoginButton/LoginButton";
import UploadPicture from "../../Posts/UploadPicture/UploadPicture";
const SERVER_URL = "http://localhost:8080";

function UpdateProfile(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");

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
      // avatar_url: data.avatar_url,
      givenName: data.givenName,
      familyName: data.familyName,
      displayName: data.displayName,
      age: data.age,
      address: data.address,
    };
    axios
      .put(`${SERVER_URL}/users/${userInfo.id}`, newUpdateInfo, {
        withCredentials: true,
      })
      .then((data) => {
        // setUserInfo(true);
        location.reload();
        props.history.push(`/profile/${userInfo.id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userInfo) {
      reset({
        displayName: userInfo.displayName,
        familyName: userInfo.familyName,
        givenName: userInfo.givenName,
        age: userInfo.age,
        address: userInfo.address,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    loginFunction();
  }, []);

  return (
    <div>
      <h1>Update</h1>
      {isLoggedIn ? (
        <div>
          <UploadPicture userInfo={userInfo} />
          <form onSubmit={handleSubmit(handelUpdate)}>
            <div>Email: {userInfo.email}</div>
            <div>Display Name: </div>
            <input
              {...register("displayName", { required: "This is required" })}
            />
            <p>{errors.displayName?.message}</p>
            <div>First Name: </div>
            <input
              {...register("givenName", { required: "This is required" })}
            />
            <p>{errors.givenName?.message}</p>
            <div>Last Name: </div>
            <input
              {...register("familyName", { required: "This is required" })}
            />
            <p>{errors.familyName?.message}</p>
            <div>Rating: {userInfo.rating}</div>
            <div>Done Case: {userInfo.doneCase}</div>
            <div>Age: </div>
            <input {...register("age", { required: "This is required" })} />
            <p>{errors.age?.message}</p>
            <div>Address: </div>
            <input
              {...register("address", {
                required: "This is required",
              })}
            />
            <p>{errors.address?.message}</p>
            <input type="submit" />
            <div>Account creates at {userInfo.updated_at}</div>
          </form>
        </div>
      ) : (
        <>
          <p>Login to update your profile.</p>
          <LoginButton />
        </>
      )}
    </div>
  );
}

export default UpdateProfile;
