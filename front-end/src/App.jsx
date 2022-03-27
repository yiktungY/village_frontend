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
import './App.scss'

function App() {
 

  return (


    <Router>
			<Header />
			<Profile />
			<Switch></Switch>
      <Footer />
   </Router>
   
  )
}

export default App
