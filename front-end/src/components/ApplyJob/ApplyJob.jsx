import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios"
const SERVER_URL = "http://localhost:8080"

function ApplyJob (props){

    const postID = props.match.params.postID
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
        
          content: ""
        }
      })
    
      useEffect(() => {
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
          .then(res => {
            if (res.data) {
              setisLoggedIn(true)
            }
          }).catch(err => console.log(err));
      }, [])

   const handleApply = (data) => {

    axios.post(`${SERVER_URL}/apply/${postID}`, 
    {
      post_id: postID,
      content: data.content

    }, {
        withCredentials: true
      })
    .then((data) => {
        console.log(data, "data")
        props.history.push(`${SERVER_URL}/posts/${postID}`)
    })
    .catch(err => {
        console.log("Error creating a new post:", err);
      })
   }
   return (
     <>
    { isLoggedIn &&
      <form onSubmit={handleSubmit(handleApply)}>
        <div>leave a message to hoster: </div>
        <input
              {...register("content", { required: "This is required." })}
              placeholder="something like:"
            />
             <p>{errors.content?.message}</p>
             <input type="submit" />
        </form>
}
    </>
   )
      
}

export default ApplyJob