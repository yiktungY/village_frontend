import React, { useState } from 'react';
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
import PostsPage from './pages/PostsPage.js/PostsPage';

function App() {
 

  return (


    <Router>
			<Header />
			<Profile />
			<UpdateProfile />
			<PostsPage />
			<Switch></Switch>
      <Footer />
   </Router>
   
  )
}

export default App
