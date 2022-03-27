import "./Profile.scss"
import React, { useState, useEffect } from 'react';
import axios from "axios";
const SERVER_URL = "http://localhost:8080"

function Profile(props){
    const userId = 3 //add props.id
    const [userInfo, setUserInfo] = useState([])


useEffect( () => {
   
function getfetchUrl() { 
    return `${SERVER_URL}/users/${userId}`
}

async function fetchData(){
const result = await axios(getfetchUrl());
setUserInfo(result.data)
}

fetchData();
  
}, [userInfo])

    return(
        <div>
            <h1>Profile</h1>
            <div>First Name: {userInfo.familyName}</div>
         <div>Last Name: {userInfo.givenName}</div>
        </div>
    )
}

export default Profile;