import "./PostDetails.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar } from "@mui/material";

import { Loading } from "../../Mui/Mui";
import ApplyJob from "../../ApplyJob/ApplyJob";

function PostDetails({ user }) {
  const { postID } = useParams();
  const [getPost, setgetPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [showApplicantsList, setShowApplicantsList] = useState([]);
  const [showApply, setShowApply] = useState(false);
  const [applyState, setApplyState] = useState("");

  const fetchPostById = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${postID}`)
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
      .post(`${import.meta.env.VITE_API_URL}/apply/${getPost.post_id}`, {
        userId: user.id,
        username: user.displayName,
        post_id: getPost.post_id,
        post_title: getPost.title,
        content: data.content,
        offer: data.offer,
      })
      .then(() => {
        setShowApply(false);
        getApplicantsByApi();
      })
      .catch((err) => {
        console.log("Error creating a new post:", err);
      });
  };

  const getApplicantsByApi = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/apply/${postID}`)
      .then((applicants) => {
        setShowApplicantsList(applicants.data);
        const appliedID = applicants.data.find(
          (info) => info.user_id === user.id
        );
        if (appliedID.user_id === user.id) {
          setApplyState(appliedID);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePostDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/posts/${getPost.post_id}`)
      .then((data) => {
        history.push(`/`);
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
    document.title = getPost.title;
    fetchPostById();
  }, [getPost.title]);

  useEffect(() => {
    getApplicantsByApi();
  }, [user]);

  return (
    <section className="postDetails">
      {loading ? (
        <Loading />
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
          {user?.id === getPost.user_id ? (
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
              {user && applyState.user_id === user.id ? (
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
                      user={user}
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
