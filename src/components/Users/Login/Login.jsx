import "./Login.scss";
import { useEffect } from "react";

import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
export default function Login({ user, login }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm("");
  const handleLogin = async (target) => {
    const email = target.email;
    const password = target.password;
    await login({ email, password });
  };

  useEffect(() => {
    document.title = "Login";
    if (user && user.id) history.push(`/profile/${user.id}`);
  }, [user, history]);

  return (
    <div className="login">
      <form className="login__box" onSubmit={handleSubmit(handleLogin)}>
        <div className="login__subTitle">Welcome to Village</div>
        <div>
          Don't have an account?
          <NavLink className="navLink" to="/SignUp">
            Sign up for free
          </NavLink>
        </div>
        <input
          className="inputStyle"
          {...register("email", { required: "This is required." })}
          placeholder="Your email"
        />
        <p className="errorMessage">{errors.email?.message}</p>
        <input
          type="password"
          className="inputStyle"
          {...register("password", { required: "This is required." })}
          placeholder="Password"
        />
        <p className="errorMessage">{errors.password?.message}</p>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}
