import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

export default function SignUp({ user, signup }) {
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm("");
  const handleSignup = async (data) => {
    const username = data.username;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if (password !== confirmPassword) {
      setFormErrorMessage("The password do not match");
    } else {
      await signup({ username, email, password });
    }
  };

  // useEffect(() => {
  //   if (user && user.id) history.push("/home");
  // }, [user, history]);

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
        <p className="errorMessage">{errors.username?.message}</p>
        <input
          className="inputStyle"
          {...register("email", {
            required: "This is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid Email Address",
            },
          })}
          placeholder="Email"
        />
        <p className="errorMessage">{errors.email?.message}</p>
        <input
          type="password"
          className="inputStyle"
          {...register("password", { required: "This is required." })}
          placeholder="Password"
        />
        <p className="errorMessage">{errors.password?.message}</p>
        <input
          type="password"
          className="inputStyle"
          {...register("confirmPassword", { required: "This is required." })}
          placeholder="Confirm Your Password"
        />
        <p className="errorMessage">{errors.confirmPassword?.message}</p>
        <p className="errorMessage">{formErrorMessage}</p>

        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
