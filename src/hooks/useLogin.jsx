import { useState, useEffect } from "react";
import axios from "axios";
const SERVER_URL = "http://localhost:8080";

export default function useLogin(userId) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");

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
