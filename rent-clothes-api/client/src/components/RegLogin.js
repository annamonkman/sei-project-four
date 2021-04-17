import React from 'react'

import Login from './Login'
import Register from './Register'

const RegLogin = () => {
  return (
    <div className="reglogin-page-wrapper">
      <div className="reglogin-login-wrapper">
        <h2 className="reglogin-title">Login</h2>
        <Login />
      </div>
      <div className="reglogin-register-wrapper">
        <h2 className="reglogin-title">Create an Account</h2>
        <Register />
      </div>
    </div>
  )
}

export default RegLogin
