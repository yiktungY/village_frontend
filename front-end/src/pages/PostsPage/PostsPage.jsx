import React, { useState, useEffect } from "react";
import axios from "axios";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";
import "./PostsPage.scss";
import "animate.css";
import logo from "../../assets/logos/move.png";
// import ChatBox from "../../components/Chatbox/Chatbox";

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
    document.title = "HOME";
    fetchPosts();
  }, []);

  return (
    <section className="postPage">
      <div className="postPage__text fontStyletwo">
        <h1 className="headerFix">Welcome!</h1>
        <h1 className="headerFix">This is VILLAGE</h1>
        <div className="animate__animated animate__flipInX subheadertwo ">
          A new way to Contribute our Community.
        </div>
        <p className=" "></p>
      </div>
      <div className="postPage__box">
        <NavLink
          className="navLink postPage__section"
          activeclassname="active"
          to="/"
        >
          All posts
        </NavLink>
        <NavLink
          className="navLink postPage__section"
          activeclassname="active"
          to="/category"
        >
          Category
        </NavLink>
      </div>
      {posts && <GetPostComponent posts={posts} />}
    </section>
  );
}

export default PostsPage;
