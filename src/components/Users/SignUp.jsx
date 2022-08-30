import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { BiMailSend, BiLock, BiUser, BiGlasses } from "react-icons/bi";

import { Button, Input } from "../Elements";

export default function SignUp({ user, signup }) {
  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [controllForm, setControllForm] = useState({
    email: { error: false, touched: false, errorMessage: "" },
    username: { error: false, touched: false, errorMessage: "" },
    password: { error: false, touched: false, errorMessage: "" },
    confirmPassword: { error: false, touched: false, errorMessage: "" },
  });

  const isValidEmail = (email) => {
    const message = "Email is invalid";
    const value = /\S+@\S+\.\S+/.test(email);
    return [value, message];
  };

  const isValidUserName = (username) => {
    const message = "Username is invalid";
    if (username.length > 3) {
      return [true, message];
    }
    return [false, message];
  };
  const isValidPassword = (password) => {
    const message = "Password is invalid";
    if (password.length > 3) {
      return [true, message];
    }
    return [false, message];
  };

  const isSamePassword = (password) => {
    const message = "The password is not the same";
    if (password !== value.password) {
      return [false, message];
    }
    return [true, message];
  };

  const handleChange = (e, key, func) => {
    const [value] = func;
    if (value) {
      console.log(controllForm.email);
      setControllForm((prev) => ({
        ...prev,
        [`${key}`]: { error: false, touched: false, errorMessage: "" },
      }));
    }
    setValue((prev) => ({
      ...prev,
      [`${key}`]: e.target.value,
    }));
  };

  const handleError = (key, func) => {
    const [value, message] = func;
    if (!value) {
      setControllForm((prev) => ({
        ...prev,
        [`${key}`]: { error: true, touched: true, errorMessage: message },
      }));
    }
  };

  // useEffect(() => {
  //   if (user && user.id) history.push("/home");
  // }, [user, history]);

  return (
    <div className="px-20 py-10">
      <form className="flex flex-col justify-center">
        <div className="">Create Account </div>
        <div>
          Already have an account?
          <NavLink to="/login">Sign in</NavLink>
        </div>
        <Input
          type="email"
          id="email"
          label="Create account with Email"
          icon={<BiMailSend />}
          value={value.email}
          error={controllForm.email}
          handleOnChange={(e) =>
            handleChange(e, "email", isValidEmail(e.target.value))
          }
          handleOnBlur={(e) =>
            handleError("email", isValidEmail(e.target.value))
          }
        />

        <Input
          type="text"
          id="username"
          label="UserName"
          icon={<BiUser />}
          value={value.username}
          error={controllForm.username}
          handleOnChange={(e) =>
            handleChange(e, "username", isValidUserName(e.target.value))
          }
          handleOnBlur={(e) =>
            handleError("username", isValidUserName(e.target.value))
          }
        />
        <Input
          type="password"
          id="newPassword"
          label="Password"
          icon={<BiLock />}
          value={value.password}
          error={controllForm.password}
          handleOnChange={(e) =>
            handleChange(e, "password", isValidPassword(e.target.value))
          }
          handleOnBlur={(e) =>
            handleError("password", isValidPassword(e.target.value))
          }
        />
        <Input
          type="password"
          id="ComfiredPassword"
          label="Comfired Password"
          icon={<BiGlasses />}
          value={value.confirmPassword}
          error={controllForm.confirmPassword}
          handleOnChange={(e) =>
            handleChange(e, "confirmPassword", isSamePassword(e.target.value))
          }
          handleOnBlur={(e) =>
            handleError("confirmPassword", isSamePassword(e.target.value))
          }
        />

        <Button action="Sign Up" />
      </form>
    </div>
  );
}
