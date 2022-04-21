import { useState, useEffect } from "react";
import axios from "axios";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com";

export default function useLogin(userId) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
          setUserInfo(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loginFunction();
  }, [isLoggedIn]);

  return { isLoggedIn, userInfo };
}
