import "./CategoryPage.scss"
import axios from "axios";
import React, { useState, useEffect } from "react";
const SERVER_URL = "http://localhost:8080";
import { NavLink } from "react-router-dom";
import GetPostbyCategory from "../../components/Posts/GetPostbyCategory/GetPostbyCategory"

function CategoryPage(){
      const [posts, setPosts] = useState([]);

      const [getCategoryName, setgetCategoryName] = useState("")

    const fetchPostsbyCategory = () => {
    axios
      .get(`${SERVER_URL}/posts/category/${b}`)
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  const fetchCategoryName = e => {
      setgetCategoryName(e.target.value)
  }

return (
    <>
    <div onClick={fetchCategoryName()}> b</div>
    <GetPostbyCategory />
    </>
)
}

export default CategoryPage;