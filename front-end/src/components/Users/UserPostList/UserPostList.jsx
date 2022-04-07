import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./UserPostList.scss";
const SERVER_URL = "http://localhost:8080";

function UserPostList(props) {
  const [userPostList, setuserPostList] = useState([]);
  const fetchPostsbyUserId = () => {
    const userId = props.match.params.id;
    axios
      .get(`${SERVER_URL}/users/posts/${userId}`)
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
      <h1 className="headline">Post List</h1>
      {userPostList &&
        userPostList.map((post) => (
          <NavLink
            className="postSection__post"
            key={post.post_id}
            to={`/post/${post.post_id}`}
          >
            <div className="postSection__replace">
              <img
                className="postSection__picture"
                src={post.picture_Details}
                alt={`${post.title} picture`}
              />
            </div>
            <div className="postSection__details">
              <div className="postSection__details--title">{post.title}</div>
              <div>content: {post.content}</div>
              <div className="postType"> {post.type}</div>
              <div className="postStatus"> {post.status}</div>
              <div className="postSection__details--user">
                By {post.displayName}
              </div>
            </div>
            <div className="postSection__details--time">Time</div>
          </NavLink>
        ))}
    </div>
  );
}

export default UserPostList;
