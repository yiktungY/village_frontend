import React, { useState, useEffect } from "react";
import axios from "axios";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";
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
    fetchPosts();
  }, []);

  return (
    <section>
      <NavLink to="/category">Category Page</NavLink>
      <h1>Posts</h1>
      {posts && <GetPostComponent posts={posts} />}
    </section>
  );
}

export default PostsPage;
