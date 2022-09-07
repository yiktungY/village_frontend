import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BiMailSend,
  BiLock,
  BiUser,
  BiGlasses,
  BiErrorCircle,
} from "react-icons/bi";

import { signUp } from "../../store/userAction";
import { Button, Input } from "../Elements";

export default function SignUp() {
  const dispatch = useDispatch();

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

  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const isValidEmail = (email) => {
    const message = "Please enter a valid email address";
    const value = /\S+@\S+\.\S+/.test(email);
    return [value, message];
  };

  const isValidUserName = (username) => {
    const message = "Please enter a valid username";
    if (username.length > 3) {
      return [true, message];
    }
    return [false, message];
  };
  const isValidPassword = (password) => {
    const message = "Password should longer than 4 digits";
    if (password.length > 4) {
      return [true, message];
    }
    return [false, message];
  };

  const isSamePassword = (password) => {
    const message = "Please enter the same password";
    if (password !== value.password) {
      return [false, message];
    }
    return [true, message];
  };

  const handleChange = (e, key, func) => {
    const [value] = func;
    if (value) {
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
  const handleSignUp = (e) => {
    e.preventDefault();
    const signUpInfo = {
      email: value.email,
      username: value.username,
      password: value.password,
    };
    dispatch(signUp(signUpInfo));
  };

  useEffect(() => {
    if (
      value.email.length > 1 &&
      value.username.length > 1 &&
      value.password.length > 1 &&
      value.confirmPassword.length > 1
    ) {
      if (
        !controllForm.email.error &&
        !controllForm.username.error &&
        !controllForm.password.error &&
        !controllForm.confirmPassword.error
      ) {
        setReadyToSubmit(true);
      }
    } else {
      setReadyToSubmit(false);
    }
  }, [value]);

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <div className="text-lg font-medium">Create an Account</div>
      <div className="">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-sky-500 font-bold mx-1 hover:text-sky-600 hover:underline"
        >
          Sign in
        </NavLink>
      </div>

      <form className="flex flex-col w-full py-4">
        <Input
          type="email"
          id="email"
          label="Create account with Email"
          icon={!controllForm.email.error ? <BiMailSend /> : <BiErrorCircle />}
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
          icon={!controllForm.username.error ? <BiUser /> : <BiErrorCircle />}
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
          icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
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
          id="confirmPassword"
          label="Comfired Password"
          icon={
            !controllForm.confirmPassword.error ? (
              <BiGlasses />
            ) : (
              <BiErrorCircle />
            )
          }
          error={controllForm.confirmPassword}
          handleOnChange={(e) =>
            handleChange(e, "confirmPassword", isSamePassword(e.target.value))
          }
          handleOnBlur={(e) =>
            handleError("confirmPassword", isSamePassword(e.target.value))
          }
        />
        <Button
          action="Sign Up"
          handleSignUp={handleSignUp}
          disable={readyToSubmit}
        />
      </form>
    </div>
  );
}
