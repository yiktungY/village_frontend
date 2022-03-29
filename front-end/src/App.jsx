
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Profile from "./components/Profile/Profile"

import UpdateProfile from "./components/UpdateProfile/UpdateProfile"
import './App.scss'
import PostsPage from './pages/PostsPage/PostsPage';
import CreatePost from "./components/Posts/CreatePost/CreatePost"

function App() {

	

  return (
    <Router>
			<Header />
			<Switch>
				<Route path="/" exact component={PostsPage} />
				<Route path="/createpost" component={CreatePost}/>
				<Route path="/profile/:id" component={Profile} />
				<Route path="/updateProfile/:id" component={UpdateProfile} />
			</Switch>
      		<Footer />
   </Router>
   
  )
}

export default App
