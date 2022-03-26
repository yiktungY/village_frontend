import "./LoginButton.scss"
const SERVER_URL = "http://localhost:8080"


function LoginButton(){



    return(
        <div className="login">
          <a href={`${SERVER_URL}/auth/google`}>Log in</a>
        </div>
    )
}

export default LoginButton;