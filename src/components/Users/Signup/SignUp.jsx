import axios from "axios";
import { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
export default function SignUp() {
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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (signUp) {
      console.log("reg!!!");
    }
  });

  return (
    <>
      <form className="createPostTwo" onSubmit={handleSubmit(handleSignup)}>
        <div className="subTitle">email: </div>

        <input
          className="inputStyle"
          {...register("username", { required: "This is required." })}
          placeholder="Yik"
        />
        <p className="errorMessage">{errors.email?.message}</p>
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
        <p className="errorMessage">{errors.email?.message}</p>
        <button
          type="submit"
          className="noStyle createPageForm__Upload--button"
        >
          <Button variant="contained">Sign Up</Button>
        </button>
      </form>
    </>
  );
}
