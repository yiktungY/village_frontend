import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./UserPostList.scss";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";

function UserPostList(props) {
  const [userPostList, setuserPostList] = useState([]);
  const fetchPostsbyUserId = () => {
    const userId = props.match.params.id;
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/posts/${userId}`)
      .then((posts) => {
        setuserPostList(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };
  useEffect(() => {
    fetchPostsbyUserId();
  }, []);

  return (
    <div className="postList">
      <h1 className="pageHeader">Post List</h1>
      {userPostList &&
        userPostList.map((post) => (
          <NavLink
            className="postSection__post"
            key={post.post_id}
            to={`/post/${post.post_id}`}
          >
            {post.jobImageUrl ? (
              <div className="postSection__replace">
                <img
                  className="postSection__picture"
                  src={post.jobImageUrl}
                  alt={`${post.title} picture`}
                />
              </div>
            ) : (
              <div className="postSection__noPicture">
                <HighlightOffTwoToneIcon sx={{ width: 100, height: 100 }} />
              </div>
            )}
            <div className="postSection__detailBox">
              <div className="postSection__details--user">
                By {post.displayName}
              </div>
              <div className="postSection__details--time">{post.updatedAt}</div>
            </div>
            <div className="postSection__title">{post.title}</div>
            <div className="postSection__details">
              <div className="postType"> {post.type}</div>
              <div className="postStatus"> {post.status}</div>
            </div>
          </NavLink>
        ))}
    </div>
  );
}

export default UserPostList;
