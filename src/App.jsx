import Routes from "./routes";
import { useState } from "react";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import { ToggleTheme } from "./components/Icon/icon";
import { BrowserRouter } from "react-router-dom";
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
    <div className={setTheme ? "lightTheme" : "darkTheme"}>
      <BrowserRouter>
        <Header />
        <ToggleTheme handleTheme={handleTheme} setTheme={setTheme} />
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
