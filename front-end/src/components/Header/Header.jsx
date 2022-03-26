import "./Header.scss"
import LoginButton from "../Button/LoginButton/LoginButton"
import LogoutButton from "../Button/LogoutButton/LogoutButton";

function Header(){


    return(
        <header className="header">
           
            <LoginButton />          
            <LogoutButton />
        </header>
    )
}

export default Header;