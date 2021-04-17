import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className="navbar-wrapper">
      <div className="navbar-link">
        <Link to="/clothes">Clothing</Link>
      </div>
      <div className="navbar-link">
        <Link to="/how-it-works">How it Works</Link>
      </div>
    </div>
  )
}

export default Navbar
