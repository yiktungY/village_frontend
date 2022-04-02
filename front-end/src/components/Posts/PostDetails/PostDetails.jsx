import "./PostDetails.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const SERVER_URL = "http://localhost:8080";

function PostDetails(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [getPost, setgetPost] = useState({});
  const [userInfo, setUserInfo] = useState("");
  const [showApplicants, setShowApplicants] = useState([]);
  const [applyState, setApplyState] = useState("");
  const postID = props.match.params.postID;

  const loginFunction = async () => {
    await axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
          setUserInfo(res.data);
          console.log("jkasdhaskjdhkjasdh", res);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchPostById = () => {
    axios
      .get(`${SERVER_URL}/posts/${postID}`)
      .then((post) => {
        setgetPost(post.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };

  const getApplicantsByApi = () => {
    axios
      .get(`${SERVER_URL}/apply/${postID}`)
      .then((applicants) => {
        setShowApplicants(applicants.data);
        const appliedID = applicants.data.find(
          (info) => info.user_id === userInfo.id
        );
        if (appliedID.user_id === userInfo.id) {
          setApplyState(appliedID);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePostDelete = () => {
    axios
      .delete(`${SERVER_URL}/posts/${getPost.post_id}`)
      .then((data) => {
        props.history.push(`/`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loginFunction();
    fetchPostById();
  }, []);

  useEffect(() => {
    getApplicantsByApi();
  }, [userInfo]);

  return (
    <section>
      <div>Name: {getPost.displayname}</div>
      <div>title: {getPost.title}</div>
      <div>content: {getPost.content}</div>
      <div>status: {getPost.status}</div>
      <div>Post at {getPost.updated_at}</div>
      <div>{showApplicants.length} People applied</div>
      {isLoggedIn && userInfo.id === getPost.user_id ? (
        <div>
          <NavLink to={`/postEdit/${getPost.post_id}`}>Edit Post</NavLink>
          <button onClick={handlePostDelete}>Delete Post</button>
          {showApplicants.map((info) => (
            <NavLink
              className="post"
              key={info.id}
              to={`/profile/${info.user_id}`}
            >
              <div>appliants: {info.username}</div>
              <div>content: {info.content}</div>
              <div>time: {info.updated_at}</div>
            </NavLink>
          ))}
        </div>
      ) : (
        <>
          {getPost.user_id === userInfo.id ? (
            <>
              <div>applied</div>
              <h2>Your application</h2>
              <div>content: {applyState.content}</div>
              <div>time: {applyState.updated_at}</div>
            </>
          ) : (
            <NavLink to={`/postApply/${getPost.post_id}`}>Apply Now</NavLink>
          )}
        </>
      )}
    </section>
  );
}

export default PostDetails;

