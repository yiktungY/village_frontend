// import "./Profile.scss";
// import React, { useState, useEffect } from "react";
// import useLogin from "../../../hooks/useLogin";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// import Button from "@mui/material/Button";
// import UploadPicture from "../../Posts/UploadPicture/UploadPicture";
// // import Chatbox from "../../Chatbox/Chatbox";
// const SERVER_URL = "http://localhost:8080";

// function Profile(props) {
//   const { userInfo, isLoggedIn } = useLogin();
//   const [userPostList, setuserPostList] = useState(false);
//   const [regArea, setRegArea] = useState(true);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm("");

//   const handleNextRegArea = () => {
//     if (regArea) {
//       setRegArea(false);
//     }
//   };

//   const handleRegAreaBack = () => {
//     if (!regArea) {
//       setRegArea(true);
//     }
//   };
//   //login function
//   const loginFunction = () => {
//     axios
//       .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
//       .then((res) => {
//         if (res.data) {
//           setisLoggedIn(true);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const getUserInfobyId = () => {
//     const userId = props.match.params.id;
//     axios.get(`${SERVER_URL}/users/${userId}`).then((res) => {
//       setUserInfo(res.data);
//     });
//   };
//   const fetchPostsbyUserId = () => {
//     const userId = props.match.params.id;
//     axios
//       .get(`${SERVER_URL}/users/posts/${userId}`)
//       .then((posts) => {
//         setuserPostList(posts.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching posts:", err);
//       });
//   };
//   const handelUpdate = (data) => {
//     const newUpdateInfo = {
//       age: data.age,
//     };
//     axios
//       .put(`${SERVER_URL}/users/${userInfo.id}`, newUpdateInfo, {
//         withCredentials: true,
//       })
//       .then((data) => {
//         props.history.push("/");
//         location.reload();
//       })
//       .catch((err) => console.log(err));
//   };
//   useEffect(() => {
//     document.title = `${userInfo.displayName} Profile`;
//     // loginFunction();
//     getUserInfobyId();
//     fetchPostsbyUserId();
//   }, [userInfo.displayName]);
//   useEffect(() => {
//     if (userInfo) {
//       reset({
//         avatar_url: userInfo.avatar_url,
//         displayName: userInfo.displayName,
//       });
//     }
//   }, [userInfo]);

//   return (
//     <section className="profile">
//       <h1 className="profile__header headline">Profile</h1>
//       {isLoggedIn && (
//         <NavLink
//           className="navLink editprofile"
//           to={`/updateProfile/${userInfo.id}`}
//         >
//           <Button variant="contained">Edit Profile</Button>
//         </NavLink>
//       )}
//       <div className="profile__info">
//         <div className="profile__info--areaone">
//           <img
//             className="profile__info--image"
//             src={userInfo.avatar_url}
//             alt="UserIcon"
//           />
//         </div>
//         <div className="profile__info--areatwo">
//           <div>Email: {userInfo.email}</div>
//           <div>Display Name: {userInfo.displayName}</div>
//           <div>First Name: {userInfo.givenName}</div>
//           <div>Last Name: {userInfo.familyName}</div>
//           <div>Rating: {userInfo.rating}</div>
//           <div>Done Case: {userInfo.doneCase}</div>
//           <div>Age: {userInfo.age}</div>
//           <div>Address: {userInfo.address}</div>
//           <div>Accounts create at {userInfo.updated_at}</div>
//         </div>
//       </div>
//       <div className="profile__info--functionArea">
//         {userPostList.length > 0 && (
//           <div className="profile__info--areathree">
//             <h1>Last Post</h1>
//             <img
//               className="profile__info--picture"
//               src={userPostList[userPostList.length - 1].picture_Details}
//               alt="{userPostList[userPostList.length - 1].title}"
//             />

//             <h2>{userPostList[userPostList.length - 1].title}</h2>
//             <div>{userPostList[userPostList.length - 1].content}</div>
//             <div className="postType">
//               {userPostList[userPostList.length - 1].type}
//             </div>
//             <div className="postStatus">
//               {userPostList[userPostList.length - 1].status}
//             </div>

//             <NavLink className="navLink" to={`/users/posts/${userInfo.id}`}>
//               <Button variant="contained">More post</Button>
//             </NavLink>
//           </div>
//         )}
//         {isLoggedIn && (
//           <>
//             {userInfo.age > 0 ? (
//               <></>
//             ) : (
//               <div>
//                 <div className="register__background"></div>
//                 <div className="register">
//                   {regArea ? (
//                     <>
//                       <h1 className="register__heading">
//                         Two more steps for your Journey...
//                       </h1>

//                       <UploadPicture userInfo={userInfo} />

//                       <div className="register__button">
//                         <Button variant="outlined" onClick={handleNextRegArea}>
//                           Next
//                         </Button>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="regform2">
//                       <h1 className="register__heading">
//                         One more step for your Journey...
//                       </h1>
//                       <form
//                         className="regform2__form"
//                         onSubmit={handleSubmit(handelUpdate)}
//                       >
//                         <div className="regform2__box">
//                           <div className="regform2__box--topic">
//                             DisplayName:{" "}
//                           </div>
//                           <input
//                             className="inputStyle"
//                             {...register("displayName", {
//                               required: "This is required",
//                             })}
//                           />
//                         </div>
//                         <p>{errors.age?.message}</p>
//                         <div className="regform2__box">
//                           <div className="regform2__box--topic">Your Age: </div>
//                           <input
//                             className="inputStyle"
//                             {...register("age", {
//                               required: "This is required",
//                             })}
//                           />
//                         </div>
//                         <p>{errors.age?.message}</p>
//                         <div className="regform2__button">
//                           <div onClick={handleRegAreaBack}>
//                             <Button variant="outlined">Back</Button>
//                           </div>
//                           <button className="noStyle" type="submit">
//                             <Button variant="contained">
//                               Starting Your Journey
//                             </Button>
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Profile;
