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
        <h2 className="animate__animated animate__fadeInDown ">
          Congregate!!! Your account is successfully created...
        </h2>
        <Button
          variant="contained"
          color="success"
          href={`${SERVER_URL}/login`}
        >
          Click here to login
        </Button>
      </div>
    </div>
  );
}

export default CreateAccount;
