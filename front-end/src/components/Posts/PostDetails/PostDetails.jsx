import "./PostDetails.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const SERVER_URL = "http://localhost:8080";

function PostDetails(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [getPost, setgetPost] = useState({});
  const [userInfo, setUserInfo] = useState("");
  const [showApplicantsList, setShowApplicantsList] = useState([]);
  const [applyState, setApplyState] = useState("");

  const loginFunction = async () => {
    await axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setisLoggedIn(true);
          setUserInfo(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchPostById = () => {
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

  const getApplicantsByApi = () => {
    const postID = props.match.params.postID;
    axios
      .get(`${SERVER_URL}/apply/${postID}`)
      .then((applicants) => {
        setShowApplicantsList(applicants.data);
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

  //no idea
  // const acceptApplicant = () => {
  //   axios.get().then(data => {

  //   })
  // }

  useEffect(() => {
    loginFunction();
    fetchPostById();
  }, []);

  useEffect(() => {
    getApplicantsByApi();
  }, [userInfo]);

 console.log(getPost.requireDate)

  return (
    <section>
      <NavLink to={`/profile/${getPost.user_id}`}>Name: {getPost.displayname}</NavLink>
      <div>title: {getPost.title}</div>
      <div>content: {getPost.content}</div>
      <div>status: {getPost.status}</div>
      <div>Post at {getPost.updated_at}</div>
      <div>Type: {getPost.type}</div>
      <div>salary: {getPost.salary}</div>
      <div>Non-Monetary Payment: {getPost.salary_replacement}</div>
      <div>Date: {getPost.requireDate}</div>
      <div>Estimate Time: {getPost.estimate_time}</div>

      <div>{showApplicantsList.length} People applied</div>
      {isLoggedIn && userInfo.id === getPost.user_id ? (
        <div>
          <NavLink to={`/postEdit/${getPost.post_id}`}>Edit Post</NavLink>
          <button onClick={handlePostDelete}>Delete Post</button>
          {showApplicantsList.map((info) => (
            <NavLink
              className="post"
              key={info.id}
              to={`/profile/${info.user_id}`}
            >
              <div>appliants: {info.username}</div>
              <div>content: {info.content}</div>
              <div>time: {info.updated_at}</div>

              {/* <button onClick={}>Accept</button> */}
            </NavLink>
          ))}
        </div>
      ) : (
        <>
          {isLoggedIn && applyState.user_id === userInfo.id ? (
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
