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
        console.log(appliedID);
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
        console.log(data);
        props.history.push(`/`);
      })
      .catch((err) => console.log(err));
  };
  // const handleApplyState = () => {
  //   const appliedID = showApplicants.find((info) => info.user_id === id);
  //   if (appliedID.user_id === userInfo.id) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  useEffect(async () => {
    await loginFunction();
    await fetchPostById();
    // await getApplicantsByApi();
    console.log("???");
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
          {applyState.user_id === userInfo.id ? (
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

//       //   <article className="post">
//       //   <h2 className="post__title">{post.title}</h2>
//       //   <div className="post__details">
//       //     <div className="post__author">
//       //       <img
//       //         className="post__avatar"
//       //         src={post.avatar_url}
//       //         alt={`${post.username} avatar`}
//       //       />
//       //       <h3 className="post__username">{post.username}</h3>
//       //       {
//       //         // Show a "Your Post" label for posts that have been created by currently logged in user
//       //         post.isCurrentUser &&
//       //         <div className="post__owned">🔥&nbsp;&nbsp;Your Post</div>
//       //       }
//       //     </div>
//       //     <p className="post__published">{formatTimestamp(post.updated_at)}</p>
//       //   </div>
//       //   <p className="post__content">{post.content}</p>
//       // </article>
