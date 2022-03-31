import React, { useState, useEffect } from 'react';
import axios from "axios";
const SERVER_URL = "http://localhost:8080"


export const Login = async (props) => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userId, setUserId] = useState("")

    useEffect(()=>{
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
        .then(res => {
            if(res.data){
                setisLoggedIn(true)
                setUserId(res.data.id)
            }
        })
        .catch(err => console.log(err));
    }, [])

}