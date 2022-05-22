import "./PostDetails.scss";
import { useState, useEffect } from "react";
import ApplyJob from "../../ApplyJob/ApplyJob";
import axios from "axios";
import useLogin from "../../../hooks/useLogin";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
const SERVER_URL = "http://localhost:8080";

function PostDetails(props) {
  const { userInfo, isLoggedIn } = useLogin();
  const [getPost, setgetPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [showApplicantsList, setShowApplicantsList] = useState([]);
  const [showApply, setShowApply] = useState(false);
  const [applyState, setApplyState] = useState("");

  const fetchPostById = () => {
    const postID = props.match.params.postID;
    axios
      .get(`${SERVER_URL}/posts/${postID}`)
      .then((post) => {
        setgetPost(post.data);
        setLoading(false);
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
    fetchPostById();
    document.title = getPost.title;
  }, [getPost.title]);

  useEffect(() => {
    getApplicantsByApi();
  }, [userInfo]);

  return (
    <section className="postDetails">
      {loading ? (
        <div className="loading">
          <ClipLoader />
        </div>
      ) : (
        <>
          <div className="postDetails__box">
            <div className="postDetails__box1--info">
              <div className="postDetails__box1--headline">
                <NavLink
                  className="navLink postDetails__box1--name"
                  to={`/profile/${getPost.user_id}`}
                >
                  <Avatar alt={getPost.displayname} src={getPost.avatar_url} />
                </NavLink>
                <h2> {getPost.title}</h2>
              </div>
              <div className="postDetails__box1--StatAndCat">
                <div className="postStatus">{getPost.status}</div>
                <div className="postType">{getPost.type}</div>
              </div>
            </div>
          </div>
          <div className="postSection__postWrapper">
            <img
              className="postSection__postPicture"
              src={getPost.picture_Details}
              alt={`${getPost.title} picture`}
            />
            <div className="postDetails__box2">
              <h2>Content</h2>
              <NavLink
                className="navLink postDetails__box1"
                to={`/profile/${getPost.user_id}`}
              >
                By {getPost.displayname}
              </NavLink>
              <div className="time">Post at {getPost.updated_at}</div>

              {getPost.salary && <div>salary: {getPost.salary}</div>}
              {getPost.salary_replacement && (
                <div>Non-Monetary Payment: {getPost.salary_replacement}</div>
              )}
              <div>Required Date: {getPost.requireDate}</div>
              <div>Estimate Time: {getPost.estimate_time}</div>
              <div>Detail: {getPost.content}</div>
              <div>{showApplicantsList.length} People applied</div>
            </div>
          </div>
          {isLoggedIn && userInfo.id === getPost.user_id ? (
            <div>
              <div className="post__button">
                <NavLink
                  className="navLink"
                  to={`/postEdit/${getPost.post_id}`}
                >
                  <Button variant="contained">Edit</Button>
                </NavLink>

                <Button
                  onClick={handlePostDelete}
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </div>
              {showApplicantsList.map((info) => (
                <NavLink
                  className="post navLink applicantsList"
                  key={info.id}
                  to={`/profile/${info.user_id}`}
                >
                  <Avatar src={info.avatar_url} alt={info.username} />
                  <div>message: {info.content}</div>
                  <div className="applicantsSpe">I Need {info.offer}</div>
                  <div className="time">time: {info.updated_at}</div>
                  <div>By {info.username}</div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="appliants">
              {isLoggedIn && applyState.user_id === userInfo.id ? (
                <div className="applicantsList">
                  <h2>Your application: {applyState.content}</h2>
                  <div>Requires: {applyState.offer}</div>
                  <div className="time">{applyState.updated_at}</div>

                  <Button>Applied</Button>
                </div>
              ) : (
                <>
                  <div onClick={showApplyModal} className="post__apply">
                    Apply Now
                  </div>
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
        </>
      )}
    </section>
  );
}

export default PostDetails;
