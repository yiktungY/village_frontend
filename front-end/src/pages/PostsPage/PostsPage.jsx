import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./PostsPage.scss"

import Post from "../../components/Posts/Post/Post"
import CreatePost from "../../components/Posts/CreatePost/CreatePost"
import { NavLink } from 'react-router-dom';



const SERVER_URL = "http://localhost:8080"

function PostsPage(){

    const [posts, setPosts] = useState([])
    const [postID, setPostID] = useState("")
    const [singlePost, setsinglePost] = useState([])

    useEffect( () => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
     
    axios.get(`${SERVER_URL}/posts`)
    .then(posts => {
        setPosts(posts.data)
    })
    .catch(err => {
    console.log("Error fetching posts:", err);
    });
    }

    const fetchPostById = () => {
        const getpostID = props.match.params.postID
        setPostID(getpostID)
        axios.get(`${SERVER_URL}/posts/${postID}`)
        .then(posts => {
            setsinglePost(posts.data)
        })
        .catch(err => {
        console.log("Error fetching posts:", err);
        }); 
    }

    return (
        <section>
            <h1>Posts</h1>
            <div className="postsection">
                {posts.map(post => 
                    <NavLink className="post" to={`${post.id}`}>
                        <div>Name: {post.displayName}</div>
                        <div>title: {post.title}</div>
                        <div>content: {post.content}</div>
                    </NavLink>)}
               <Post post={singlePost}/>
            </div>
        </section>
    )   
}

export default PostsPage;