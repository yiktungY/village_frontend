import "./CreateAccount.scss";
const SERVER_URL = "http://localhost:8080";
import "animate.css";

function CreateAccount() {
  return (
    <div className="loginSuccessed">
      <h2 className="animate__animated animate__fadeInDown">
        Congregate!!! Your account is successfully created...
      </h2>
      <a
        className="navLink loginSuccessed__login"
        href={`${SERVER_URL}/auth/google`}
      >
        Click here to login
      </a>
    </div>
  );
}

export default CreateAccount;
