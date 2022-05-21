import "./LogoutButton.scss";
import Button from "@mui/material/Button";

function LogoutButton() {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return <Button onClick={handleLogout}>Log out</Button>;
}

export default LogoutButton;
