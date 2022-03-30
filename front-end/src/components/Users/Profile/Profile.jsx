import "./Profile.scss"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
const SERVER_URL = "http://localhost:8080"

function Profile(props){
  
  
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userId, setUseId] = useState("")
    const [userInfo, setUserInfo] = useState([])

    //login function
    useEffect(()=>{
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
        .then(res => {
            if(res.data){
                setisLoggedIn(true)
                setUseId(res.data.id)
            }
        }).catch(err => console.log(err));
    }, [])

   
    //get one user's information
    useEffect(()=> {
        axios
        .get(`${SERVER_URL}/users/${userId}`)
        .then(({data}) => { 
            setUserInfo(data);
        }).catch(err => console.log(err));;
    }, [userId]);



    return(
        <div>
             {userInfo && <div className="updatedEffect">Profile Updated</div>}
            <h1>Profile</h1>
            <div>First Name: {userInfo.familyName}</div>
         <div>Last Name: {userInfo.givenName}</div>
         {isLoggedIn && <NavLink to={`/updateProfile/${userId}`}>Edit Profile</NavLink>}
        </div>

    )
}

export default Profile;