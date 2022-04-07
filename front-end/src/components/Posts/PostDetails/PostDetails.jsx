import "./PostDetails.scss";
import { useState, useEffect } from "react";
import ApplyJob from "../../ApplyJob/ApplyJob";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const SERVER_URL = "http://localhost:8080";

function PostDetails(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [getPost, setgetPost] = useState({});
  const [userInfo, setUserInfo] = useState("");
  const [showApplicantsList, setShowApplicantsList] = useState([]);
  const [showApply, setShowApply] = useState(false);
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

  const handleApply = (data) => {
    axios
      .post(
        `${SERVER_URL}/apply/${getPost.post_id}`,
        {
          post_id: getPost.post_id,
          post_title: getPost.title,
          content: data.content,
          offer: data.offer,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Error creating a new post:", err);
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
  const showApplyModal = () => {
    if (!showApply) {
      setShowApply(true);
    }
  };

  const hideApplyModal = () => {
    if (showApply) {
      setShowApply(false);
    }
  };

  useEffect(() => {
    loginFunction();
    fetchPostById();
    document.title = getPost.title;
  }, [getPost.title]);

  useEffect(() => {
    getApplicantsByApi();
  }, [userInfo]);

  return (
    <section className="postDetails">
      <div className="postDetails__box">
        <div className="postDetails__box1">
          <div className="postDetails__box1--image">
            <div className="postSection__replace">
              <img
                className="postSection__picture"
                src={getPost.picture_Details}
                alt={`${getPost.title} picture`}
              />
            </div>
          </div>
          <div className="postDetails__box1--info">
            <h1>{getPost.title}</h1>
            <NavLink
              className="navLink name"
              to={`/profile/${getPost.user_id}`}
            >
              <Button variant="contained"> By {getPost.displayname}</Button>
            </NavLink>

            <div className="postStatus">{getPost.status}</div>

            <div>{showApplicantsList.length} People applied</div>
          </div>
        </div>
        <div className="postDetails__box2">
          <h2>Content</h2>
          <div className="time">Post at {getPost.updated_at}</div>
          <div className="postType">{getPost.type}</div>
          {getPost.salary && <div>salary: {getPost.salary}</div>}
          {getPost.salary_replacement && (
            <div>Non-Monetary Payment: {getPost.salary_replacement}</div>
          )}
          <div>Date: {getPost.requireDate}</div>
          <div>Estimate Time: {getPost.estimate_time}</div>
          <div>Detail: {getPost.content}</div>
        </div>
      </div>
      {isLoggedIn && userInfo.id === getPost.user_id ? (
        <div>
          <div className="post__button">
            <NavLink className="navLink" to={`/postEdit/${getPost.post_id}`}>
              <Button variant="contained">Edit Post</Button>
            </NavLink>
            <div className="delete">
              <Button
                onClick={handlePostDelete}
                startIcon={<DeleteIcon />}
                variant="outlined"
                color="error"
              >
                Delete Post
              </Button>
            </div>
            {/* <button onClick={handlePostDelete}>Delete Post</button> */}
          </div>
          {showApplicantsList.map((info) => (
            <NavLink
              className="post navLink"
              key={info.id}
              to={`/profile/${info.user_id}`}
            >
              <div>appliants: {info.username}</div>
              <div>content: {info.content}</div>
              <div className="applicantsSpe">I Need {info.offer}</div>
              <div className="time">time: {info.updated_at}</div>

              {/* <button onClick={}>Accept</button> */}
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="appliants">
          {isLoggedIn && applyState.user_id === userInfo.id ? (
            <div className="">
              <h2>Your application</h2>
              <h3> {applyState.content}</h3>
              <div>Requires: {applyState.offer}</div>
              <div className="time">{applyState.updated_at}</div>

              <div>Applied</div>
            </div>
          ) : (
            <>
              <Button onClick={showApplyModal}>Apple Now</Button>
              {/* <div onClick={showApplyModal} className="">
                Apply Now
              </div> */}
              {showApply && (
                <ApplyJob
                  handleApply={handleApply}
                  hideApplyModal={hideApplyModal}
                  postUserId={getPost.displayname}
                  isLoggedIn={isLoggedIn}
                />
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default PostDetails;
