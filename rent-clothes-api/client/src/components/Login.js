import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  console.log(formData, setFormData)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await axios.post('/api/auth/login/', formData)
    window.localStorage.setItem('token', response.data.token)
    console.log(response)
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input 
            name="email" 
            type="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input 
            name="password" 
            type="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <input 
            className="submit-button" 
            type="submit" 
            value="Login"/>
        </div>
      </form>
    </div>
  )
}

export default Login
