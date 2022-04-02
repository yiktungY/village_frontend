import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoginButton from "../Button/LoginButton/LoginButton";
const SERVER_URL = "http://localhost:8080";

function ApplyJob(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [getPost, setgetPost] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const getPostDataByAPI = () => {
    const postID = props.match.params.postID;
    axios
      .get(`${SERVER_URL}/posts/${postID}`)
      .then((post) => {
        setgetPost(post.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  const handleApply = (data) => {
    axios
      .post(
        `${SERVER_URL}/apply/${getPost.post_id}`,
        {
          post_id: getPost.post_id,
          post_title: getPost.title,
          content: data.content,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        props.history.push(`/post/${getPost.post_id}`);
      })
      .catch((err) => {
        console.log("Error creating a new post:", err);
      });
  };

  useEffect(() => {
    loginFunction();
    getPostDataByAPI();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit(handleApply)}>
          <div>leave a message to hoster: </div>
          <input
            {...register("content", { required: "This is required." })}
            placeholder="something like:"
          />
          <p>{errors.content?.message}</p>
          <input type="submit" />
        </form>
      ) : (
        <>
          <div>It seems that you haven't logged in your account</div>
          <LoginButton />
        </>
      )}
    </>
  );
}

export default ApplyJob;
