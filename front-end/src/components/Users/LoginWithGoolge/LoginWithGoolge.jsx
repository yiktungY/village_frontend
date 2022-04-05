import "./LoginWithGoolge.scss";
import "animate.css";
const SERVER_URL = "http://localhost:8080";

function LoginWithGoolge() {
  return (
    <div className="login">
      <h1 className="animate__animated animate__bounce">
        Login with Google in one step
      </h1>
      <div className="login__box">
        <div className="login__box--text border">
          <a className="navLink " href={`${SERVER_URL}/auth/google`}>
            Login
          </a>
        </div>
        <div className="login__box--text">
          <h2>First time? </h2>
          <a className="navLink" href={`${SERVER_URL}/auth/google`}>
            Try create a new account with google
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginWithGoolge;
