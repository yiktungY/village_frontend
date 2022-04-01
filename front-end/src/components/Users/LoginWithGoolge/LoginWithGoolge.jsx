import "./LoginWithGoolge.scss";
const SERVER_URL = "http://localhost:8080";

function LoginWithGoolge() {
  return (
    <div className="login">
      <h2>Login with Google in one step</h2>
      <a href={`${SERVER_URL}/auth/google`}>Log in</a>

      <a href={`${SERVER_URL}/auth/google`}>
        First time? Try create a new account with google
      </a>
    </div>
  );
}

export default LoginWithGoolge;
