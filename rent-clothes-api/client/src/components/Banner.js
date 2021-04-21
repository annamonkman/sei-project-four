/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayloadFromToken } from '../helpers/auth'

const Banner = () => {

  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const payload = getPayloadFromToken()

    const getData = async () => {
      const { data } = await axios.get(`/api/auth/${payload.sub}/`,{
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      setUserInfo(data)
      console.log('data', data)
    }
    if (payload) {
      getData()
    }
    if (!payload) {
      return null
    }
    
  },[])


  const handleLogout = () => {
    window.localStorage.removeItem('token')
    setIsLoggedIn(false)
    history.push('/')
  }

  useEffect(() => {
    if (userIsAuthenticated()) return setIsLoggedIn(true)
    if (!userIsAuthenticated()) return setIsLoggedIn(false)
  }, [userIsAuthenticated, isLoggedIn])

  // if (!userInfo) return null

  console.log('user info', userInfo)

  return (
    
    <header>

      <div className="banner-wrapper">
        <div className="banner-content">
          <div className="logo-banner-link">
            <Link to="/">
              <h1 id="logo">LOGO</h1>
            </Link>
          </div>
          {!isLoggedIn || !userInfo ?
            <div className="reglogin-banner-link">
              <Link to="/sign-in">Sign-in</Link>
            </div>
            :
            <>
              <div className="reglogin-banner-link">
                <Link to={`/user-profile/${userInfo.id}`}>Profile</Link>
                <button onClick={handleLogout} className="logout-button">Log out</button>
              </div>
            </>
          }

        </div>
        
      </div>
      
      <div className="navbar-wrapper">
        <div className="navbar-link">
          <Link to="/clothes">Clothing</Link>
        </div>
        <div className="navbar-link">
          <Link to="/how-it-works">How it Works</Link>
        </div>
      </div>

    </header>
      
    
  )
}
export default Banner
