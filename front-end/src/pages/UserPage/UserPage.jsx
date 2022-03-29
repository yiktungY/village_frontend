import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./UserPage.scss"
import Profile from "../../components/Profile/Profile"
const SERVER_URL = "http://localhost:8080"

function userPage(){

    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(()=>{
    axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
    .then(res => {
        if(res.data){
            setisLoggedIn(true)
        }
    }).catch(err => {
        console.log("Error fetching posts:", err);
        });
}, [])

return(
    <div>
    {isLoggedIn ? <Profile isLoggedIn={true} />  : <Profile isLoggedIn={false} /> }
    </div>
)

}

export default userPage