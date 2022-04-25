import "./Header.scss";
import LogoutButton from "../../components/Button/LogoutButton/LogoutButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import Signup from "../../components/oauth/Signup";
function Header() {
  const { userInfo, isLoggedIn } = useLogin();
  const [iconInfo, setIconInfo] = useState(false);

  const handleIconInfo = () => {
    if (!iconInfo) {
      setIconInfo(true);
    } else {
      setIconInfo(false);
    }
  };

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
      {/* <Signup /> */}
      {isLoggedIn ? (
        <div>
          <Avatar
            onClick={handleIconInfo}
            sx={{ width: 56, height: 56 }}
            className="header__userIcon"
            src={userInfo.avatar_url}
            alt="UserIcon"
          />

          {iconInfo && (
            <div onClick={handleIconInfo} className="header__info">
              <NavLink className="navLink" to="/createpost">
                <Button variant="contained"> Create a Post</Button>
              </NavLink>
              <NavLink
                className="navLink header_user"
                activeClassName="activeheader"
                to={`/profile/${userInfo.id}`}
              >
                <Button>My profile</Button>
              </NavLink>
              <LogoutButton />
            </div>
          )}
        </div>
      ) : (
        <>
          <NavLink className="navLink" to="/loginWithGoogle">
            <Button variant="contained" disableElevation>
              Log in / Create a new Account
            </Button>
          </NavLink>
        </>
      )}
      <div className="header__nav">
        <div className="header__nav">
          <NavLink
            className="header__nav--pageDefault"
            activeClassName="header__nav--pageState"
            to="/home"
          >
            HOME
          </NavLink>
          <NavLink
            className="header__nav--pageDefault"
            activeClassName="header__nav--pageState"
            to="/category"
          >
            CATEGORY
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
