import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./layout/Header";
import Home from "./pages/Home";
import PostListPage from "./pages/PostListPage";
import SaveJobsPage from "./pages/SaveJobsPage";
import DashboradPage from "./pages/DashboardPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import { authAction } from "./store/login-slice";
import Login from "./components/Users/Login";
import PopUp from "./layout/PopUp";

const RouteList = () => {
  const { showLogin } = useSelector((state) => state.popUp);

  return (
    <BrowserRouter>
      <Header />
      {showLogin && <PopUp target="showLogin" children={<Login />} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:jobID" element={<PostListPage />} />
        <Route path="/saveJobs" element={<SaveJobsPage />} />
        <Route path="/dashboard" element={<DashboradPage />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        <Route path="/job/:jobID" element={<PostDetailsPage />} />
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
          path="/postEdit/:postID"
          render={() => <EditPost user={user} />}
        />
        <Route path="/postApply/:postID" component={ApplyJob} /> */}
    </BrowserRouter>
  );
};

export default RouteList;
