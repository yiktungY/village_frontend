import "./UpdateProfile.scss"
import React, { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import LoginButton from "../Button/LoginButton/LoginButton"
const SERVER_URL = "http://localhost:8080"

function UpdateProfile(props){


    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userId, setUserId] = useState("")
    // const [userInfo, setUserInfo] = useState(false)
    
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            familyName: "",
            givenName: ""
        }
    })

    useEffect(()=>{
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
        .then(res => {
            if(res.data){
                setisLoggedIn(true)
                setUserId(res.data.id)
            }
        })
        .catch(err => console.log(err));
    }, [userId])

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
                // setUserInfo(true);
                props.history.push("/profile/:id");
            })
            .catch(err => console.log(err));  
    }



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