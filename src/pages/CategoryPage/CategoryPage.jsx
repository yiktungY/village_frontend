import "./CategoryPage.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
const SERVER_URL = "https://village-backend-finalproject.herokuapp.com";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";
import { TextField } from "@mui/material";
import useToggle from "../../hooks/useToggle";

function CategoryPage() {
  const [posts, setPosts] = useState("");
  const [inputText, setInputText] = useState("");
  const { value, toggleValue } = useToggle(false);
  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

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
    document.title = "Category";
  }, [getCategoryName]);

  return (
    <div className="category">
      <div className="searchBar">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search Key Words"
        />
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

          {value ? (
            <>
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
                  Design
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
            </>
          ) : (
            <div className="category__area--showMore" onClick={toggleValue}>
              MORE ...
            </div>
          )}
        </div>

        {posts && <GetPostComponent posts={posts} input={inputText} />}
      </div>
    </div>
  );
}

export default CategoryPage;
