import "./Header.scss";
import LogoutButton from "../Button/LogoutButton/LogoutButton";
import Button from "@mui/material/Button";
import useLogin from "../../hooks/useLogin";
import { NavLink } from "react-router-dom";

function Header() {
  const { userInfo, isLoggedIn } = useLogin();

  return (
    <header className="header">
      <NavLink
        className="navLink fontStyle"
        activeClassName="activeheader"
        to="/"
      >
        <div className="header__logo">
          Vi<span className="header__logo--special">ll</span>ge
        </div>
      </NavLink>

      {isLoggedIn ? (
        <div className="header__info">
          <NavLink
            className="navLink header_user"
            activeClassName="activeheader"
            to={`/profile/${userInfo.id}`}
          >
            <img className="icon" src={userInfo.avatar_url} alt="UserIcon" />
          </NavLink>
          <NavLink className="Nodisplay" to="/createpost">
            <Button variant="contained"> Create a Post</Button>
          </NavLink>

          <LogoutButton />
        </div>
      ) : (
        <>
          <NavLink className="Nodisplay" to="/loginWithGoogle">
            <Button variant="contained" disableElevation>
              Log in / Create a new Account
            </Button>
          </NavLink>
        </>
      )}
    </header>
  );
}

export default Header;
