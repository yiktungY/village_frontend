import { useState, useEffect } from "react";
import axios from "axios";

import "animate.css";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Loading } from "../../components/Mui/Mui";
import GetPostComponent from "../../components/Posts/GetPostComponent/GetPostComponent";
import "./PostsPage.scss";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const inputHandler = (e) => {
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
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          height: 400,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom component="div">
          h3. Heading
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <TextField
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search Topic, Category, User... "
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <>
          <GetPostComponent posts={posts} input={inputText} />
          <Stack spacing={2}>
            <Pagination count={10} shape="rounded" />
          </Stack>
        </>
      )}
    </Box>
  );
}

export default PostsPage;
