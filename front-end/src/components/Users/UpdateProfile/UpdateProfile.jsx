import "./UpdateProfile.scss";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoginButton from "../../Button/LoginButton/LoginButton";
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
        props.history.push("/profile/:id");
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
        <form onSubmit={handleSubmit(handelUpdate)}>
          {/* <div>{userInfo.familyName}</div> */}
          {/* <input ref={register} type="file" name="picure"/>  */}
          <div>Display Name: </div>
          <input
            {...register("displayName", { required: "This is required" })}
          />
          <p>{errors.displayName?.message}</p>
          <div>familyName: </div>
          <input
            {...register("familyName", { required: "This is required" })}
          />
          <p>{errors.familyName?.message}</p>
          <div>givenName: </div>
          <input {...register("givenName", { required: "This is required" })} />
          <p>{errors.givenName?.message}</p>
          <div>Age: </div>
          <input {...register("age", { required: "This is required" })} />
          <p>{errors.age?.message}</p>
          <div>Address: </div>
          <input
            {...register("address", {
              required: "This is required",
              // value: {lastName}
            })}
          />
          <p>{errors.address?.message}</p>
          <input type="submit" />
        </form>
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
