import { useState } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import './App.scss'

function App() {
 

  return (


    <Router>
			<Header />
	
			<Switch></Switch>
      <Footer />
   </Router>
   
  )
}

export default App
