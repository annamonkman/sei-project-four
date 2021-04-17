import React from 'react'

const Login = () => {
  return (
    <div className="login-form-container">
      <form>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input name="email" type="email" id="email"/>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password"/>
        </div>
      </form>
    </div>
  )
}

export default Login
