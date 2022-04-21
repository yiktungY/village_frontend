import { useEffect } from "react";
import "./LogoutButton.scss";
import Button from "@mui/material/Button";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com";

function LogoutButton() {
  return <Button href={`${SERVER_URL}/auth/logout`}>Log out</Button>;
}

export default LogoutButton;
