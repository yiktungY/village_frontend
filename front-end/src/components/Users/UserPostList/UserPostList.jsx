import React, { useState, useEffect } from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import "./UserPostList.scss"
const SERVER_URL = "http://localhost:8080";


function UserPostList(props){
 const [userPostList, setuserPostList] = useState([])
    const fetchPostsbyUserId = () => {

      const userId = props.match.params.id;
    axios
      .get(`${SERVER_URL}/users/posts/${userId}`)
      .then((posts) => {
        setuserPostList(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };
  useEffect(() => {
     fetchPostsbyUserId() 
  }, [])
  
return(
    <>

{userPostList && userPostList.map(post => 
(
     <NavLink
          className="post"
          key={post.post_id}
          to={`post/${post.post_id}`}
        >
          <div>title: {post.title}</div>
          <div>content: {post.content}</div>
          <div>Status: {post.status}</div>
        </NavLink>
))
}
     </>
)
}

export default UserPostList;