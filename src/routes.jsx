import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import UserPage from "./pages/UserPage/UserPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import UpdateProfile from "./components/Users/UpdateProfile/UpdateProfile";
import "./App.scss";
import PostsPage from "./pages/PostsPage/PostsPage";
import UserPostList from "./components/Users/UserPostList/UserPostList";
import CreatePost from "./components/Posts/CreatePost/CreatePost";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
import EditPost from "./components/Posts/EditPost/EditPost";
import ApplyJob from "./components/ApplyJob/ApplyJob";
import Login from "./components/Users/Login/Login";
import SignUp from "./components/Users/Signup/SignUp";
import CreateAccount from "./components/Users/CreateAccount/CreateAccount";
import Header from "./layout/Header/Header";
import ClipLoader from "react-spinners/ClipLoader";

function Routes() {
  const [user, setUser] = useState({
    isFetching: true,
  });
  const history = useHistory();
  //   const [formErrorMessage, setFormErrorMessage] = useState(false);
  const signup = async (credentials) => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        credentials
      );
      //   await localStorage.setItem("village-token", data.token);
      setUser(data);
      if (data) {
        history.push("/registerSuccee");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials
      );
      await localStorage.setItem("village-token", data.token);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/auth/logout`);
      localStorage.removeItem("messenger-token");
      setUser({});
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setUser((prev) => ({ ...prev, isFetching: true }));
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/user`
        );
        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setUser((prev) => ({ ...prev, isFetching: false }));
      }
    };
    fetchUser();
  }, []);

  if (user?.isFetching) {
    return (
      <div className="loading">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <Header user={user} logout={logout} />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" exact component={PostsPage} />
        <Route
          path="/login"
          render={() => <Login user={user} login={login} />}
        />
        <Route
          path="/signUp"
          render={() => <SignUp user={user} signup={signup} />}
        />
        <Route path="/registerSuccee" component={CreateAccount} />
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
        <Route path="/createpost" render={() => <CreatePost user={user} />} />
        <Route
          path="/post/:postID"
          render={() => <PostDetails user={user} />}
        />
        <Route
          path="/postEdit/:postID"
          render={() => <EditPost user={user} />}
        />
        <Route path="/postApply/:postID" component={ApplyJob} />
      </Switch>
    </>
  );
}

export default Routes;
