import axios from "axios";
import { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
export default function Login() {
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
        console.log(response);
        sessionStorage.authToken = response.data.token;
        useLogin(true);

        // sessionStorage.setItem("token", response.data.token);
      })
      .catch((err) => {
        console.log(err);
        useLogin({ isLoginError: true, errorMessage: err });
      });
  };

  useEffect(() => {
    if (login) {
    
      console.log("login!!!");
    }
  });

  return (
    <>
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
        <button
          type="submit"
          className="noStyle createPageForm__Upload--button"
        >
          <Button variant="contained">Login</Button>
        </button>
      </form>
    </>
  );
}
