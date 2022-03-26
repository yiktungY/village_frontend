import React from "react";
import "./Profile.scss"
import {setState, setEffect} from React;
import axios from "axios";
const SERVER_URL = "http://localhost:8080"

function Profile(){

const getUserInfo = () => {

    axios.get(`${SERVER_URL}/${userId}/profile`)
}

    return(
        <div></div>
    )
}

export default Profile;