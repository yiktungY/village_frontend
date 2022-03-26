import './LogoutButton.scss';
const SERVER_URL= "http://localhost:8080"

function LogoutButton(){

return   (
    <a className="logout-button" href={`${SERVER_URL}/auth/logout`}>Log out</a>
)
}

export default LogoutButton;