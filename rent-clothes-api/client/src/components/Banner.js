import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'

const Banner = () => {

  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    setIsLoggedIn(false)
    history.push('/')
  }

  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    if (userIsAuthenticated()) return setIsLoggedIn(true)
    if (!userIsAuthenticated()) return setIsLoggedIn(false)
  }, [userIsAuthenticated, isLoggedIn])

  return (
    <div className="banner-wrapper">
      <div className="logo-banner-link">
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
      </div>

      {!isLoggedIn ?

        <div className="reglogin-banner-link">
          <Link to="/sign-in">Sign-in</Link>
        </div>

        :

        <>
          <div className="reglogin-banner-link">
            <Link to="/user-profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">Log out</button>
          </div>
          
        </>

      }

    </div>
  )
}

export default Banner
