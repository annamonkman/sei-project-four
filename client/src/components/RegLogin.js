import React from 'react'

import Login from './Login'
import Register from './Register'

const RegLogin = () => {
  return (
    <div className="reglogin-page-wrapper">
      <div className="reglogin-login-wrapper">
        <h3 className="reglogin-title">Login</h3>
        <Login />
      </div>
      <div className="reglogin-register-wrapper">
        <h3 className="reglogin-title">Create an Account</h3>
        <Register />
      </div>
    </div>
  )
}

export default RegLogin
