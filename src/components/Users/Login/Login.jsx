import axios from "axios";
import { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
export default function Login(props) {
  const [login, useLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm("");
  const handleLogin = (data) => {
    axios
      .post(`${SERVER_URL}/login`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        sessionStorage.authToken = response.data.token;
        useLogin(true);
        sessionStorage.setItem("userId", response.data.id);
        props.history.push(`/profile/${response.data.id}`);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        useLogin({ isLoginError: true, errorMessage: err });
      });
  };

  useEffect(() => {
    document.title = "Login";
    if (login) {
      console.log(data);
      console.log("login!!!");
    }
  }, []);

  return (
    <div className="login">
      <form className="createPostTwo" onSubmit={handleSubmit(handleLogin)}>
        <div className="subTitle">email: </div>

        <input
          className="inputStyle"
          {...register("email", { required: "This is required." })}
          placeholder="xxx@gmail.com"
        />
        <p className="errorMessage">{errors.email?.message}</p>
        <input
          type="password"
          className="inputStyle"
          {...register("password", { required: "This is required." })}
          placeholder="*******"
        />
        <p className="errorMessage">{errors.password?.message}</p>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      <div>
        Don't have an account?
        <NavLink to="/SignUp">Sign up for free</NavLink>
      </div>
    </div>
  );
}
