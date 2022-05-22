import { BsToggleOn, BsToggleOff } from "react-icons/bs";

import "./icon.scss";
export const ToggleTheme = ({ handleTheme, setTheme }) => (
  <>
    {setTheme ? (
      <div className="toggleIcon  whiteState">
        <BsToggleOff onClick={handleTheme} />
      </div>
    ) : (
      <div className="toggleIcon darkState">
        <BsToggleOn onClick={handleTheme} />
      </div>
    )}
  </>
);
