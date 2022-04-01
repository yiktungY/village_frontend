import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./EditPost.scss";
const SERVER_URL = "http://localhost:8080";

function EditPost(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [getPost, setgetPost] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");
  const postID = props.match.params.postID;

  //login
  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
          setUserInfo(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //get post from API
  const fetchPostById = () => {
    axios
      .get(`${SERVER_URL}/posts/${postID}`)
      .then((posts) => {
        setgetPost(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  useEffect(() => {
    if (getPost) {
      reset({
        title: getPost.title,
        content: getPost.content,
      });
    }
  }, [getPost]);

  useEffect(() => {
    loginFunction();
    fetchPostById();
  }, []);

  const handlePostlUpdate = (data) => {
    const newPostInfo = {
      title: data.title,
      content: data.content,
    };
    axios
      .put(`${SERVER_URL}/posts/${postID}`, newPostInfo, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        props.history.push(`/post/${postID}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {isLoggedIn && userInfo.id === getPost.user_id ? (
        <form onSubmit={handleSubmit(handlePostlUpdate)}>
          <h3>Edit Post</h3>
          <div>TITLE: </div>
          <input
            {...register("title", { required: "This is required." })}
            placeholder="something like: Looking for a dog walker"
          />
          <p>{errors.title?.message}</p>
          <div>DETAIlS: </div>
          <input
            {...register("content", { required: "This is required." })}
            placeholder="I need a dog walker"
          />
          <p>{errors.content?.message}</p>
          <input type="submit" />
        </form>
      ) : (
        <div>login</div>
      )}
    </div>
  );
}

export default EditPost;
