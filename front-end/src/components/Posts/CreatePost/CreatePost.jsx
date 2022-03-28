import React, { useState, useEffect } from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import "./CreatePost.scss"
import LoginButton from "../../Button/LoginButton/LoginButton"
const SERVER_URL = "http://localhost:8080"

function CreatePost(props){

    const [isLoggedIn, setisLoggedIn] = useState(false)
    const {register, handleSubmit, formState: {errors} } = useForm({
      defaultValues: {
        title: "",
        content: ""
      }}
    );


    useEffect(()=>{
        axios.get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
        .then(res => {
            if(res.data){
                setisLoggedIn(true)
            }
        })
    }, [])


    const handleFormSubmit = (data) => {

        axios.post(`${SERVER_URL}/posts`,{
            title: data.title,
            content: data.content
        },
         {
            withCredentials: true
        })
        .then(()=> {
      
            data.reset()
        })
        .catch(err => {
            console.log("Error creating a new post:", err);
        })
    
    }
    return(
        <section className="create-post">
        {
          isLoggedIn ? (
            // If user is logged in, render form for creating a post
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <h3>Create New Post</h3> 
                <div>TITLE: </div>
                  <input 
                  {...register("title", {required: "This is required."})}
                    placeholder="something like: Looking for a dog walker"
                    />   
                    <p>{errors.title?.message}</p>
                    <div>DETAIlS: </div>    
                  <input 
                  {...register("content",  {required: "This is required."})}
                    placeholder="I need a dog walker"
                    />
                    <p>{errors.content?.message}</p>
                <input type="submit" />
              </form>
          ) : (
            // If user is not logged in, render login button
            <>
              <p>Login to create your own posts.</p>
              <LoginButton />
            </>
          )
        }
      </section>
    )
}

export default CreatePost;