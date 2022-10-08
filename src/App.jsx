import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { authAction } from "./store/login-slice";
import { noticiationActions } from "./store/noticiation-slice";
import Footer from "./layout/Footer/Footer";
import RouteList from "./RouteList";

axios.interceptors.request.use(async function (config) {
  const token = localStorage.getItem("villageToken");
  config.headers["x-access-token"] = token;
  return config;
});

function App() {
  const dispatch = useDispatch();
  const getUserInfoFromAPI = async () => {
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`);
    return data;
  };

  const getUserInfo = async () => {
    try {
      const user = await getUserInfoFromAPI();
      if (user.status === 400) {
        dispatch(noticiationActions.showMessage("Login fail"));
      }
      if (user.status === 200) {
        dispatch(authAction.autoLogin(user.data.user));
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  // const [setTheme, useSetTheme] = useState(true);
  // const handleTheme = () => {
  //   if (setTheme) {
  //     useSetTheme(false);
  //   } else {
  //     useSetTheme(true);
  //   }

  return (
    <div>
      {/* <ToggleTheme handleTheme={handleTheme} setTheme={setTheme} /> */}
      <RouteList />
    </div>
  );
}

export default App;
