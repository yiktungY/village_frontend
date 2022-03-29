import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./PostsPage.scss"

import Post from "../../components/Posts/Post/Post"
import CreatePost from "../../components/Posts/CreatePost/CreatePost"

const SERVER_URL = "http://localhost:8080"

function PostsPage(){

    const [posts, setPosts] = useState([])

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

    return (
        <section>
            <h1>Posts</h1>
            <div className="postsection">
                {posts.map(post => <Post key={post.id} post={post} />)}
            </div>
        </section>
    )   
}

export default PostsPage;