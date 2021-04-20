import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'

const Banner = () => {

  const history = useHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  // const [userInfo, setUserInfo] = useState(null)
  const params = useParams()


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/auth/${params.id}/`,{
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      console.log('PARAMS>>', params)
      // setUserInfo(data)
      console.log('data', data)
    }
    getData()
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
            {/* {userInfo.map( info => { 
              <Link to={`/user-profile/${info.id}`}>Profile</Link>
            })} */}
            <button onClick={handleLogout} className="logout-button">Log out</button>
          </div>
          
        </>

      }

    </div>
  )
}

export default Banner
