import "./CreateAccount.scss";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com";
import "animate.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
function CreateAccount() {
  useEffect(() => {
    document.title = "Successfully Create An Account";
  });
  return (
    <div className="loginSuccessed">
      <div className="loginSuccessed__background">
        <h2 className="animate__animated animate__fadeInDown loginSuccessed__title ">
          Congratulations!!! Your account is successfully created...
        </h2>
        <NavLink className="navLink" to="/login">
          Click here to login
        </NavLink>
      </div>
    </div>
  );
}

export default CreateAccount;
