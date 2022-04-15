import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
import LoginWithGoolge from "./components/Users/LoginWithGoolge/LoginWithGoolge";
import CreateAccount from "./components/Users/CreateAccount/CreateAccount";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" exact component={PostsPage} />
        <Route path="/loginWithGoogle" component={LoginWithGoolge} />
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
      <Footer />
    </Router>
  );
}

export default App;
