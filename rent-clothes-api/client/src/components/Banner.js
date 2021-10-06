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
        <div className="logo-banner-link">
          <Link to="/" id="logo">
            CAROUSEL
          </Link>
        </div>
        {!isLoggedIn || !userInfo ?
          <div className="user-links">
            <Link to="/sign-in" className="user-link-item sign-in-link"></Link>
          </div>
          :
          <>
            <div className="user-links">
              <Link to={`/user-profile/${userInfo.id}`} className="user-link-item profile-page-link"></Link>
              <button onClick={handleLogout} className="logout-button user-link-item">Log out</button>
            </div>
          </>
        }
      </div>
      
      <section className="nav-links-wrapper">
        <ul className="nav-links-list">
          <li className="nav-link"><Link to="/clothes">Clothing</Link></li>
          <li className="nav-link"><Link to="/how-it-works">How We Work</Link></li>
          <li className="nav-link"><Link to="/about-us">About Carousel Collective</Link></li>
        </ul>
      </section>

    </header>
      
    
  )
}
export default Banner
