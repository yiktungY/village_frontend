import "./Header.scss"
import LoginButton from "../Button/LoginButton/LoginButton"
import LogoutButton from "../Button/LogoutButton/LogoutButton";
import React, { useState, useEffect } from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";

const SERVER_URL = "http://localhost:8080"


function Header(){

    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userId, setUserId] = useState("")

    useEffect(()=>{
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
        .then(res => {
            if(res.data){
                setisLoggedIn(true)
                setUserId(res.data.id)
            }
        }).catch(err => console.log(err));
    }, [])

    return(
        <header className="header">
           
            <NavLink to="/">HOME</NavLink>    
            {isLoggedIn ? <LogoutButton /> : <LoginButton /> } 
            {isLoggedIn && 
            <NavLink to="/createpost">Create a Post</NavLink>
            }
            {isLoggedIn && 
            <NavLink to={`/profile/${userId}`}>My Page</NavLink>
            }
            
            
        </header>
    )
}

export default Header;