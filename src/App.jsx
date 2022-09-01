import { useState } from "react";

import axios from "axios";
import Footer from "./layout/Footer/Footer";
import RouteList from "./RouteList";

// axios.interceptors.request.use(async function (config) {
//   const token = await localStorage.getItem("village-token");
//   config.headers["x-access-token"] = token;
//   return config;
// });

function App() {
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
      <Footer />
    </div>
  );
}

export default App;
