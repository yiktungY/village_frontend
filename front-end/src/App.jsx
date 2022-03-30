
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Profile from "./components/Users/Profile/Profile"

import UpdateProfile from "./components/Users/UpdateProfile/UpdateProfile"
import './App.scss'
import PostsPage from './pages/PostsPage/PostsPage';
import CreatePost from "./components/Posts/CreatePost/CreatePost"
import Post from "./components/Posts/Post/Post"

function App() {

	

  return (
    <Router>
			<Header />
			<Switch>
				<Route path="/" exact component={PostsPage} />
				<Route path="/createpost" component={CreatePost}/>
				<Route path="/profile/:id" component={Profile} />
				<Route path="/updateProfile/:id" component={UpdateProfile} />
				<Route path="/post/:postID" component={Post} />
			</Switch>
      		<Footer />
   </Router>
   
  )
}

export default App
