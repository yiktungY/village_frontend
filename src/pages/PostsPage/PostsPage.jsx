import React, { useState, useEffect } from "react";
import axios from "axios";

import "animate.css";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Loading } from "../../components/Mui/Mui";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";
import "./PostsPage.scss";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const inputHandler = (e) => {
    //convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const fetchPosts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((posts) => {
        setPosts(posts.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  useEffect(() => {
    document.title = "HOME";
    fetchPosts();
  }, [posts]);

  return (
    <Box>
      <Grid
        container
        sx={{
          backgroundColor: "primary.dark",
        }}
        spacing={4}
      >
        <Grid item sx={12} md={6}>
          <TextField
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search Topic, Category, User... "
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <TextField
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search Topic, Category, User... "
          />
        </Grid>
      </Grid>

      <h2 className="newPostSection__topic">All Posts</h2>
      {loading ? (
        <Loading />
      ) : (
        <GetPostComponent posts={posts} input={inputText} />
      )}
    </Box>
  );
}

export default PostsPage;
