import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="banner-wrapper">
      <div className="logo-banner-link">
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
      </div>
      <div className="reglogin-banner-link">
        <Link to="/sign-in">
          <h3>Sign-in</h3>
        </Link>
      </div>
      
    </div>
  )
}

export default Banner
