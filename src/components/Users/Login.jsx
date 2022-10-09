import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMailSend, BiLock, BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { loginAction } from "../../store/userAction";
import { authAction } from "../../store/login-slice";
import { noticiationActions } from "../../store/noticiation-slice";
import { Button, Input, Loader, Alert } from "../Elements";
import { isValidEmail, isValidPassword } from "./Auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error, success, isLoggedIn } = useSelector(
    (state) => state.login
  );

  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [controllForm, setControllForm] = useState({
    email: { error: false, touched: false, errorMessage: "" },
    password: { error: false, touched: false, errorMessage: "" },
  });

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

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const loginInfo = {
      email: value.email,
      password: value.password,
    };
    dispatch(loginAction(loginInfo));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(noticiationActions.showMessage("Login Successfully"));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (value.email.length > 5 && value.password.length > 4) {
      if (!controllForm.email.error && !controllForm.password.error) {
        setReadyToSubmit(true);
      }
    } else {
      setReadyToSubmit(false);
    }
  }, [value]);

  return (
    <div className="px-4 py-10 flex flex-col items-center">
      <div className="text-lg font-medium">Login Your Account</div>
      <div className="flex flex-row">
        No account yet?
        <div
          onClick={handleLogin}
          className="text-sky-500 font-bold mx-1 hover:text-sky-600 hover:underline cursor-pointer"
        >
          Sign Up Now
        </div>
      </div>

      <form className="flex flex-col items-center w-full py-4">
        <Input
          type="email"
          id="email"
          label="Enter Email"
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
          type="password"
          id="EnterPassword"
          label="Enter Password"
          icon={!controllForm.password.error ? <BiLock /> : <BiErrorCircle />}
          error={controllForm.password.error}
          handleOnChange={(e) =>
            handleChange(e, "password", isValidPassword(e.target.value))
          }
          handleOnBlur={(e) =>
            handleError("password", isValidPassword(e.target.value))
          }
        />
        {loading ? (
          <Loader />
        ) : (
          <Button
            action="Login"
            handleAction={handleSubmitLogin}
            disable={readyToSubmit}
          />
        )}
      </form>
      {error && <Alert id="login" title="Login Error" message={error} />}
    </div>
  );
};

export default Login;
