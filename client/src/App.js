import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Banner from './components/Banner'
import Footer from './components/Footer'
import ItemIndex from './components/ItemIndex'
import ItemShow from './components/ItemShow'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import RegLogin from './components/RegLogin'
import UserProfile from './components/UserProfile'
import Checkout from './components/Checkout'

const App = () => {

  return (
    <BrowserRouter>
      <Banner />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/clothes">
          <ItemIndex />
        </Route>
        <Route exact path="/clothes/:id">
          <ItemShow />
        </Route>
        <Route exact path="/user-profile/:id">
          <UserProfile />
        </Route>
        <Route exact path ="/sign-in">
          <RegLogin/>
        </Route>
        <Route exact path ="/register">
          <Register />
        </Route>
        <Route exact path ="/login">
          <Login />
        </Route>
        <Route exact path ="/how-it-works">
          <HowItWorks />
        </Route>
        <Route exact path ="/about-us">
          <About />
        </Route>
        <Route exact path ="/checkout">
          <Checkout />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
