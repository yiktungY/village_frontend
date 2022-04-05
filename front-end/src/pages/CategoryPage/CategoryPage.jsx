import "./CategoryPage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";

function CategoryPage() {
  const [posts, setPosts] = useState("");

  const [getCategoryName, setgetCategoryName] = useState("");

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
      <h1>Category</h1>
      <div className="category__area">
        <div className="category__area--box">
          <div
            className="category__area--title"
            type="text"
            onClick={handleChange}
          >
            a
          </div>
        </div>
        <div className="category__area--box">
          <div
            className="category__area--title"
            type="text"
            onClick={handleChange}
          >
            a
          </div>
        </div>
        <div className="category__area--box">
          <div
            className="category__area--title"
            type="text"
            onClick={handleChange}
          >
            a
          </div>
        </div>
        <div className="category__area--box">
          <div
            className="category__area--title"
            type="text"
            onClick={handleChange}
          >
            a
          </div>
        </div>
        <div className="category__area--box">
          <div
            className="category__area--title"
            type="text"
            onClick={handleChange}
          >
            a
          </div>
        </div>
        <div className="category__area--box">
          <div
            className="category__area--title"
            type="text"
            onClick={handleChange}
          >
            a
          </div>
        </div>
      </div>
      {posts && <GetPostComponent posts={posts} />}
    </div>
  );
}

export default CategoryPage;
