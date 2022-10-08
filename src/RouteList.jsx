import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Header from "./layout/Header";
import Home from "./pages/Home";
import PostListPage from "./pages/PostListPage";
import SaveJobsPage from "./pages/SaveJobsPage";
import DashboradPage from "./pages/DashboardPage";
import CreatePostPage from "./pages/CreatePostPage";
import { authAction } from "./store/login-slice";
import Login from "./components/Users/Login";
import PopUp from "./layout/PopUp";

const RouteList = () => {
  const dispatch = useDispatch();
  const { loginOpen } = useSelector((state) => state.login);
  const handleLogin = () => {
    dispatch(authAction.openForm());
  };
  // const logout = async () => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_API_URL}/auth/logout`);
  //     localStorage.removeItem("messenger-token");
  //     setUser({});
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setUser((prev) => ({ ...prev, isFetching: true }));
  //     try {
  //       const { data } = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/auth/user`
  //       );
  //       setUser(data.user);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setUser((prev) => ({ ...prev, isFetching: false }));
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <BrowserRouter>
      <Header />
      {loginOpen && <PopUp action={handleLogin} children={<Login />} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<PostListPage />} />
        <Route path="/saveJobs" element={<SaveJobsPage />} />
        <Route path="/dashboard" element={<DashboradPage />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

      {/* <Route
          path="/login"
          render={() => <Login user={user} login={login} />}
        />
       
        <Route path="/profile/:id" render={() => <UserPage user={user} />} />
        <Route
          path="/users/posts/:id"
          render={() => <UserPostList user={user} />}
        />
        <Route path="/category" component={CategoryPage} />
        <Route
          path="/updateProfile/:id"
          render={() => <UpdateProfile user={user} />}
        />
       
        <Route
          path="/post/:postID"
          render={() => <PostDetails user={user} />}
        />
        <Route
          path="/postEdit/:postID"
          render={() => <EditPost user={user} />}
        />
        <Route path="/postApply/:postID" component={ApplyJob} /> */}
    </BrowserRouter>
  );
};

export default RouteList;
