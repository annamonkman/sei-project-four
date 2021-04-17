import React, { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  console.log(formData, setFormData)
  
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
        <div className="form-field">
          <input className="submit-button" type="submit" value="Login"/>
        </div>
      </form>
    </div>
  )
}

export default Login
