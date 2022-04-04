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
    <>
      <div type="text" onClick={handleChange}>
        b
      </div>
      <div type="text" onClick={handleChange}>
        c
      </div>

      {posts && <GetPostComponent posts={posts} />}
    </>
  );
}

export default CategoryPage;
