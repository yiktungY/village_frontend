import axios from "axios";
import { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
export default function SignUp(props) {
  const [signUp, useSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm("");
  const handleSignup = (data) => {
    axios
      .post(`${SERVER_URL}/signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        useSignUp(true);
        props.history.push(`/registerSuccee`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (signUp) {
      console.log("reg!!!");
    }
  });

  return (
    <div className="login">
      <form className="login__box" onSubmit={handleSubmit(handleSignup)}>
        <div className="login__subTitle">Create Account </div>
        <div>
          Already have an account?
          <NavLink to="/login">Sign in</NavLink>
        </div>
        <input
          className="inputStyle"
          {...register("username", { required: "This is required." })}
          placeholder="UserName"
        />
        <p className="errorMessage">{errors.email?.message}</p>
        <input
          className="inputStyle"
          {...register("email", { required: "This is required." })}
          placeholder="Email"
        />
        <p className="errorMessage">{errors.email?.message}</p>
        <input
          type="password"
          className="inputStyle"
          {...register("password", { required: "This is required." })}
          placeholder="Password"
        />
        <p className="errorMessage">{errors.email?.message}</p>
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
