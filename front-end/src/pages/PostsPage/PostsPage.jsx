import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostsPage.scss";
import { NavLink } from "react-router-dom";
const SERVER_URL = "http://localhost:8080";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${SERVER_URL}/posts`)
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };
  useEffect(() => {
    console.log("hello");
    return () => {
      console.log("bye");
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      <h1>Posts</h1>
      {posts.map((post) => (
        <NavLink
          className="post"
          key={post.post_id}
          to={`post/${post.post_id}`}
        >
          <div>Name: {post.displayName}</div>
          <div>title: {post.title}</div>
          <div>content: {post.content}</div>
          <div>Status: {post.status}</div>
        </NavLink>
      ))}
    </section>
  );
}

export default PostsPage;
