import Routes from "./routes";
import { useState } from "react";
import Footer from "./layout/Footer/Footer";
import { ToggleTheme } from "./components/Icon/icon";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("village-token");
  config.headers["x-access-token"] = token;
  return config;
});

function App() {
  const [setTheme, useSetTheme] = useState(true);
  const handleTheme = () => {
    if (setTheme) {
      useSetTheme(false);
    } else {
      useSetTheme(true);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <ToggleTheme handleTheme={handleTheme} setTheme={setTheme} />
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
