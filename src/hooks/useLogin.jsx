import { useState, useEffect } from "react";
import axios from "axios";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com/";

export default function useLogin() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("123");

  const loginFunction = () => {
    if (sessionStorage.authToken) {
      setisLoggedIn(true);
      axios
        .get(`${SERVER_URL}/users/${sessionStorage.userId}`)
        .then((res) => {
          if (res.data) {
            setUserInfo(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    loginFunction();
  }, [isLoggedIn]);

  return { isLoggedIn, userInfo };
}
