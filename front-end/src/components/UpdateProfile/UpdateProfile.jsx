import "./UpdateProfile.scss"
import React, { useState, useEffect } from 'react';
import axios from "axios";
const SERVER_URL = "http://localhost:8080"

function UpdateProfile(){

    const userId = 1 //add props.id
    const [userInfo, setUserInfo] = useState([])
    const [updateInfo, setupdateInfo] = useState([])

   const handelUpdate = e => {
        e.preventDefault();
        console.log("hi")
        const newUpdateInfo = {
            givenName, familyName
        }
        axios.put(
            `${SERVER_URL}/users/${userId}`, newUpdateInfo)
            // .then(() => {

            // })
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
    <input type="text" placeholder={userInfo.familyName}/>
    <input type="text" placeholder={userInfo.givenName}/>
    <button onClick={handelUpdate}>update</button>
    
</div>
    )
}

export default UpdateProfile;