import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./ApplyJob.scss";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

function ApplyJob(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <>
      {props.isLoggedIn ? (
        <div className="applyList">
          <div className="applyList__background"></div>
          <form
            className="applyList__form"
            onSubmit={handleSubmit(props.handleApply)}
          >
            <h2 className="applyList__title">
              leave a message to {props.postUserId}{" "}
            </h2>
            <input
              className="inputStyle"
              {...register("content", {
                required: "This is required.",
              })}
              placeholder="Introduction and explain why"
            />
            <h2 className="applyList__title">
              What would you like to receive?{" "}
            </h2>

            <p>{errors.content?.message}</p>
            <input
              className="inputStyle"
              {...register("offer", {
                required: "This is required.",
              })}
              placeholder="something like: 10 bucks per hour"
            />
            <p>{errors.offer?.message}</p>
            <Button onClick={props.hideApplyModal}>cancel</Button>
            <button className="noStyle" type="submit">
              <Button variant="contained">Sumbit</Button>
            </button>
            <div>
              Please apply carefully. Once you applied the job, you are not able
              the edit / detele it.
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="applyList__background"></div>
          <div className="applyList__form">
            <Button onClick={props.hideApplyModal}>cancel</Button>
            <h2 className="">OPPS! You haven't logged in yet...</h2>
            <NavLink className="navLink LinkButton" to="/loginWithGoogle">
              <Button variant="contained"> Click here</Button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default ApplyJob;
