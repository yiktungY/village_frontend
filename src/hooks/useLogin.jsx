import { useState, useEffect } from "react";
import axios from "axios";


export default function useLogin() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("123");

  const loginFunction = () => {
    if (sessionStorage.authToken) {
      setisLoggedIn(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${sessionStorage.userId}`)
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
