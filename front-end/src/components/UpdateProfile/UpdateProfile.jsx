import "./UpdateProfile.scss"
import React, { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import LoginButton from "../Button/LoginButton/LoginButton"
const SERVER_URL = "http://localhost:8080"

function UpdateProfile(){

    const userId = 1 //add props.id
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState([])

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            familyName: "",
            givenName: ""
        }
    })
    console.log(userInfo)

    useEffect(()=>{
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
        .then(res => {
            if(res.data){
                setisLoggedIn(true)
            }
        })
    }, [])

   const handelUpdate = data => {

        const newUpdateInfo = {
            givenName: data.givenName,
            familyName: data.familyName

        }
        axios.put(
            `${SERVER_URL}/users/${userId}`, newUpdateInfo, 
            {
                withCredentials: true
            })
            .then((data) => {
                console.log(data)
            })
            .catch(err => console.log(err));  
    }

    useEffect(()=> {
        axios
        .get(`${SERVER_URL}/users/${userId}`)
        .then(({data}) => {
            setUserInfo(data);
        });
    }, []);


    return (
<div>
    <h1>Update</h1>
    {isLoggedIn ? (
    <form onSubmit={handleSubmit(handelUpdate)}>
        {/* <div>{userInfo.familyName}</div> */}
    <div>familyName: </div>
    <input {...register("familyName", 
    {required: "This is required"})}
    />
    <p>{errors.familyName?.message}</p>
    <div>givenName: </div>
    <input {...register("givenName", {required: "This is required", 
    // value: {lastName}
})}
    />
     <p>{errors.givenName?.message}</p>
    <input type="submit" />
    </form>
    ) : (
    <>
        <p>Login to update your profile.</p>
        <LoginButton />
    </>
    )
    }
</div>
    )
}

export default UpdateProfile;