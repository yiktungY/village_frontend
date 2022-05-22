import { BsToggleOn, BsToggleOff } from "react-icons/bs";

import "./icon.scss";
export const ToggleTheme = ({ handleTheme, setTheme }) => (
  <>
    {setTheme ? (
      <div className="toggleIcon darkState ">
        <BsToggleOff onClick={handleTheme} />
      </div>
    ) : (
      <div className="toggleIcon whiteState">
        <BsToggleOn onClick={handleTheme} />
      </div>
    )}
  </>
);
