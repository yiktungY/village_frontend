import "./UpdateProfile.scss";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import LoginButton from "../../Button/LoginButton/LoginButton";
import UploadPicture from "../../Users/UploadPicture/UploadPicture";
import useLogin from "../../../hooks/useLogin";
import { useHistory } from "react-router-dom";

function UpdateProfile({ user }) {

  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");

  const handelUpdate = (data) => {
    const newUpdateInfo = {
      avatar_url: data.avatar_url,
      givenName: data.givenName,
      familyName: data.familyName,
      displayName: data.displayName,
      age: data.age,
      address: data.address,
    };
    axios
      .put(`${import.meta.env.VITE_API_URL}/users/${user.id}`, newUpdateInfo)
      .then((data) => {
        history.push(`/profile/${user.id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName,
        familyName: user.familyName,
        givenName: user.givenName,
        age: user.age,
        address: user.address,
      });
    }
  }, [user]);

  return (
    <div className="updatePage">
      <h1 className="pageHeader">Update</h1>
      {user ? (
        <div>
          <UploadPicture userInfo={user} />
          <form
            className="updatePage__form"
            onSubmit={handleSubmit(handelUpdate)}
          >
            <div className="updatePage__box boxOne">
              <div>Display Name: </div>
              <input
                className="inputStyle"
                {...register("displayName", { required: "This is required" })}
              />
              <p>{errors.displayName?.message}</p>
              <div>First Name: </div>
              <input
                className="inputStyle"
                {...register("givenName", { required: "This is required" })}
              />
              <p>{errors.givenName?.message}</p>
              <div>Last Name: </div>
              <input
                className="inputStyle"
                {...register("familyName", { required: "This is required" })}
              />
              <p>{errors.familyName?.message}</p>
              <div>Age: </div>
              <input
                className="inputStyle"
                {...register("age", { required: "This is required" })}
              />
              <p>{errors.age?.message}</p>
              <div>Address: </div>
              <input
                className="inputStyle"
                {...register("address", {
                  required: "This is required",
                })}
              />
              <p>{errors.address?.message}</p>
              <div className="createPostButton">
                <button className="noStyle" type="submit">
                  <Button variant="contained">Submit</Button>
                </button>
              </div>
            </div>
            <div className="updatePage__box boxTwo">
              <h2>Info you cannot change</h2>
              <div>Email: {user.email}</div>
              <div>Rating: {user.rating}</div>
              <div>Done Case: {user.doneCase}</div>

              <div>Account creates at {user.updated_at}</div>
            </div>
          </form>
        </div>
      ) : (
        <>
          <p>Please login to update your profile.</p>
          <NavLink className="navLink" to="/login">
            <Button variant="contained" disableElevation>
              Log in / Create a new Account
            </Button>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default UpdateProfile;
