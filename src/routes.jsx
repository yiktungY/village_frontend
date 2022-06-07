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
import { useState } from "react";
import axios from "axios";
const SERVER_URL = "http://localhost:8080";

function Routes() {
  const history = useHistory();
  const [user, setUser] = useState({});
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
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={PostsPage} />
      <Route path="/login" render={() => <Login user={user} login={login} />} />
      <Route
        path="/signUp"
        render={() => <SignUp user={user} signup={signup} />}
      />
      <Route path="/registerSuccee" component={CreateAccount} />
      <Route path="/profile/:id" component={UserPage} />
      <Route path="/users/posts/:id" component={UserPostList} />
      <Route path="/category" component={CategoryPage} />
      <Route path="/updateProfile/:id" component={UpdateProfile} />
      <Route path="/createpost" component={CreatePost} />
      <Route path="/post/:postID" component={PostDetails} />
      <Route path="/postEdit/:postID" component={EditPost} />
      <Route path="/postApply/:postID" component={ApplyJob} />
    </Switch>
  );
}

export default Routes;
