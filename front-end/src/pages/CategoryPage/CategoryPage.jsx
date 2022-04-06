import "./CategoryPage.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";

function CategoryPage() {
  const [posts, setPosts] = useState("");

  const [getCategoryName, setgetCategoryName] = useState("Cook");

  const fetchPostsbyCategory = () => {
    axios
      .get(`${SERVER_URL}/posts/category/${getCategoryName}`)
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };
  const handleChange = (e) => {
    setgetCategoryName(e.target.innerHTML);
  };
  useEffect(() => {
    fetchPostsbyCategory();
  }, [getCategoryName]);

  return (
    <div className="category">
      <h1 className="category__title">Category</h1>
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
      <div className="category__wrapper">
        <div className="category__area">
          <div className="category__area--box account">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              Accounting
            </div>
          </div>
          <div className="category__area--box babysitting">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              Babysitting
            </div>
          </div>
          <div className="category__area--box cook">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              Cook
            </div>
          </div>
          <div className="category__area--box housekeeping">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              Housekeeping
            </div>
          </div>
          <div className="category__area--box design">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              Design/ video editing
            </div>
          </div>
          <div className="category__area--box gardening">
            <div
              className="category__area--title "
              type="text"
              onClick={handleChange}
            >
              Gardening
            </div>
          </div>
          <div className="category__area--box dog">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              dog walking
            </div>
          </div>
          <div className="category__area--box technician">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              technician jobs
            </div>
          </div>
          <div className="category__area--box house">
            <div
              className="category__area--title"
              type="text"
              onClick={handleChange}
            >
              house moving
            </div>
          </div>
        </div>
        {posts && <GetPostComponent posts={posts} />}
      </div>
    </div>
  );
}

export default CategoryPage;
