import "./CreateAccount.scss";
const SERVER_URL = "http://localhost:8080";
import "animate.css";
import { useEffect } from "react";
import Button from "@mui/material/Button";

function CreateAccount() {
  useEffect(() => {
    document.title = "Successfully Create An Account";
  });
  return (
    <div className="loginSuccessed">
      <div className="loginSuccessed__background"> 
      <h1 className="animate__animated animate__fadeInDown loginSuccessed__title">
        Congregate!!! Your account is successfully created...
      </h1>
      <Button
        variant="contained"
        color="success"
        href={`${SERVER_URL}/auth/google`}
      >
        Click here to login
      </Button>
      </div>
    </div>
  );
}

export default CreateAccount;
