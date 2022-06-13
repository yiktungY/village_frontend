import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
// import UploadPicture from "../../components/Users/UploadPicture/UploadPicture";

const SERVER_URL = "https://village-backend-finalproject.herokuapp.com/";

function UserPage({ user }) {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState("");
  const [userPostList, setuserPostList] = useState(false);
  // const [regArea, setRegArea] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");

  // const handleNextRegArea = () => {
  //   if (regArea) {
  //     setRegArea(false);
  //   }
  // };

  // const handleRegAreaBack = () => {
  //   if (!regArea) {
  //     setRegArea(true);
  //   }
  // };

  const getUserInfobyId = () => {
    axios.get(`${SERVER_URL}/users/${id}`).then((res) => {
      setUserInfo(res.data);
    });
  };
  const fetchPostsbyUserId = () => {
    axios
      .get(`${SERVER_URL}/users/posts/${id}`)
      .then((posts) => {
        setuserPostList(posts.data);
      })
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  };
  // const handelUpdate = (data) => {
  //   const newUpdateInfo = {
  //     age: data.age,
  //   };
  //   axios
  //     .put(`${SERVER_URL}/users/${userInfo.id}`, newUpdateInfo)
  //     .then((data) => {
  //       props.history.push("/");
  //       location.reload();
  //     })
  //     .catch((err) => .log(err));
  // };
  useEffect(() => {
    document.title = `${userInfo.displayName} Profile`;
    getUserInfobyId();
    fetchPostsbyUserId();
  }, [userInfo.displayName]);
  useEffect(() => {
    if (userInfo) {
      reset({
        avatar_url: userInfo.avatar_url,
        displayName: userInfo.displayName,
      });
    }
  }, [userInfo]);

  return (
    <section className="profile">
      <h1 className="pageHeader">{userInfo.displayName}'s Profile</h1>
      {user?.id === id && (
        <NavLink
          className="navLink profile__edit"
          to={`/updateProfile/${userInfo.id}`}
        >
          <Button variant="contained">Edit Profile</Button>
        </NavLink>
      )}
      <div className="profile__info">
        <div className="profile__info--areaone">
          <Avatar
            sx={{ width: 250, height: 250 }}
            src={userInfo.avatar_url}
            alt="UserIcon"
          />
        </div>
        <div className="profile__info--areatwo">
          <div className="profile__info--text">
            <section className="profile__info--nameAndPerform">
              <h3>Info</h3>
              <div>First Name: {userInfo.givenName}</div>
              <div>Last Name: {userInfo.familyName}</div>
              <div>Age: {userInfo.age}</div>
            </section>
            <section className="profile__info--nameAndPerform">
              <h3>Performance</h3>
              <div>Rating: {userInfo.rating}</div>
              <div>Done Case: {userInfo.doneCase}</div>
            </section>
          </div>
          <section className="profile__info--contact">
            <h3>Contact Me</h3>
            <div className="profile__info--email">{userInfo.email}</div>
            <div>Address: {userInfo.address}</div>
            <div>Accounts create at {userInfo.updated_at}</div>
          </section>
        </div>
      </div>
      <div className="profile__info--functionArea">
        {userPostList.length > 0 && (
          <div className="profile__info--areathree">
            <h2 className="profile__info--subheader">The Latest Post</h2>
            <NavLink
              className="navLink "
              to={`/post/${userPostList[0].post_id}`}
            >
              <h2>{userPostList[0].title}</h2>
              <div className="profile__info--postTextInfo">
                <img
                  className="profile__info--picture"
                  src={userPostList[0].picture_Details}
                  alt={userPostList[0].title}
                />
                <div className="profile__info--postText">
                  <div>{userPostList[0].content}</div>
                  <div className="postType">{userPostList[0].type}</div>
                  <div className="postStatus">{userPostList[0].status}</div>
                </div>
              </div>
            </NavLink>

            <NavLink
              className="navLink morePost"
              to={`/users/posts/${userInfo.id}`}
            >
              <Button variant="contained">More posts</Button>
            </NavLink>
          </div>
        )}
        {/* {isLoggedIn && (
          <>
            {userInfo.age > 0 ? (
              <></>
            ) : (
              <div>
                <div className="register__background"></div>
                <div className="register">
                  {regArea ? (
                    <>
                      <h1 className="register__heading">
                        Two more steps for your Journey...
                      </h1>

                      <UploadPicture userInfo={userInfo} />

                      <div className="register__button">
                        <Button variant="outlined" onClick={handleNextRegArea}>
                          Next
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="regform2">
                      <h1 className="register__heading">
                        One more step for your Journey...
                      </h1>
                      <form
                        className="regform2__form"
                        onSubmit={handleSubmit(handelUpdate)}
                      >
                        <div className="regform2__box">
                          <div className="regform2__box--topic">
                            DisplayName:{" "}
                          </div>
                          <input
                            className="inputStyle"
                            {...register("displayName", {
                              required: "This is required",
                            })}
                          />
                        </div>
                        <p>{errors.age?.message}</p>
                        <div className="regform2__box">
                          <div className="regform2__box--topic">Your Age: </div>
                          <input
                            className="inputStyle"
                            {...register("age", {
                              required: "This is required",
                            })}
                          />
                        </div>
                        <p>{errors.age?.message}</p>
                        <div className="regform2__button">
                          <div onClick={handleRegAreaBack}>
                            <Button variant="outlined">Back</Button>
                          </div>
                          <button className="noStyle" type="submit">
                            <Button variant="contained">
                              Starting Your Journey
                            </Button>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )} */}
      </div>
    </section>
  );
}

export default UserPage;
