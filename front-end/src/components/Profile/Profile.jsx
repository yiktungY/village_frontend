import "./Profile.scss"
import React, { useState, useEffect } from 'react';
import axios from "axios";
const SERVER_URL = "http://localhost:8080"

function Profile(props){
    const userId = 1 //add props.id
    const [userInfo, setUserInfo] = useState([])

useEffect(()=> {
    axios
    .get(`${SERVER_URL}/users/${userId}`)
    .then(({data}) => {
        setUserInfo(data);
    });
}, []);


    return(
        <div>
            <h1>Profile</h1>
            <div>First Name: {userInfo.familyName}</div>
         <div>Last Name: {userInfo.givenName}</div>
        </div>
    )
}

export default Profile;