import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

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
import { useState } from "react";
import axios from "axios";
const SERVER_URL = "http://localhost:8080";

function Routes() {
  const history = useHistory();
  const [user, setUser] = useState({});
  //   const [formErrorMessage, setFormErrorMessage] = useState(false);
  const signup = async (credentials) => {
    try {
      const data = await axios.post(`${SERVER_URL}/signup`, credentials);
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
      const { data } = await axios.post(`${SERVER_URL}/login`, credentials);
      await localStorage.setItem("village-token", data.token);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.delete(`${SERVER_URL}/logout`);
      localStorage.removeItem("messenger-token");
      setUser({});
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

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
        <Route path="/postEdit/:postID" component={EditPost} />
        <Route path="/postApply/:postID" component={ApplyJob} />
      </Switch>
    </>
  );
}

export default Routes;
