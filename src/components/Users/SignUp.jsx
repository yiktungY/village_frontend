import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BiMailSend,
  BiLock,
  BiUser,
  BiGlasses,
  BiErrorCircle,
} from "react-icons/bi";

import { authAction } from "../../store/login-slice";
import { signUpAction } from "../../store/userAction";
import { Button, Input, Loader, Alert } from "../Elements";
import {
  isValidEmail,
  isValidUserName,
  isValidPassword,
  isSamePassword,
} from "./Auth";

export default function SignUp() {
  const navigate = useNavigate();
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

  const { loading, error, userInfo, success } = useSelector(
    (state) => state.signUp
  );
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const handleLogin = () => {
    dispatch(authAction.openForm());
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
    dispatch(signUpAction(signUpInfo));
  };

  useEffect(() => {
    if (
      value.email.length > 1 &&
      value.username.length > 1 &&
      value.password.length > 1 &&
      value.confirmPassword.length === value.password.length
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
      {error && <Alert id="signUp" title="Sign Up Error" message={error} />}
      <div className="text-lg font-medium">Create an Account</div>
      <div className="flex flex-row">
        Already have an account?
        <div
          onClick={handleLogin}
          className="text-sky-500 font-bold mx-1 hover:text-sky-600 hover:underline cursor-pointer"
        >
          Login
        </div>
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
            handleChange(
              e,
              "confirmPassword",
              isSamePassword(e.target.value, value.password)
            )
          }
          handleOnBlur={(e) =>
            handleError(
              "confirmPassword",
              isSamePassword(e.target.value, value.password)
            )
          }
        />
        {loading ? (
          <Loader />
        ) : (
          <Button
            action="Sign Up"
            handleAction={handleSignUp}
            disable={readyToSubmit}
          />
        )}
      </form>
    </div>
  );
}
