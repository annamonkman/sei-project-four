import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  
  const [errors, setErrors] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  // const [success, setSuccess] = useState(null)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      // setSuccess(true)
      console.log(response)
    } catch (err) {
      console.log(err.response)
      setErrors(err.response.data.errors)
    }
    
  }
  
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input 
            className={`input ${errors.username ? 'is-error' : ''}`}
            name="username" 
            type="text" id="username" 
            value={formData.username} 
            onChange={handleChange}/>
        </div>
        { errors.username && <p className="error-message">{errors.username}</p> }
        <div className="form-field">
          <label htmlFor="firstname">First Name</label>
          <input 
            className={`input ${errors.first_name ? 'is-error' : ''}`}
            name="first_name" 
            type="text" 
            id="firstname" 
            value={formData.first_name} 
            onChange={handleChange}/>
        </div>
        { errors.first_name && <p className="error-message">{errors.first_name}</p> }
        <div className="form-field">
          <label htmlFor="lastname">Last Name</label>
          <input 
            className={`input ${errors.last_name ? 'is-error' : ''}`}
            name="last_name" 
            type="text" 
            id="lastname" 
            value={formData.last_name} 
            onChange={handleChange}/>
        </div>
        { errors.last_name && <p className="error-message">{errors.last_name}</p> }
        <div className="form-field">
          <label htmlFor="reg-email">Email Address</label>
          <input 
            className={`input ${errors.email ? 'is-error' : ''}`}
            name="email" 
            type="email" 
            id="reg-email" 
            value={formData.email} 
            onChange={handleChange}/>
        </div>
        { errors.email && <p className="error-message">{errors.email}</p> }
        <div className="form-field">
          <label htmlFor="reg-password">Password</label>
          <input 
            className={`input ${errors.password ? 'is-error' : ''}`}
            name="password" 
            type="password" 
            id="reg-password" 
            value={formData.password} 
            onChange={handleChange}/>
        </div>
        { errors.password && <p className="error-message">{errors.password}</p> }
        <div className="form-field">
          <label htmlFor="passwordconf">Confirm Your Password</label>
          <input 
            className={`input ${errors.password_confirmation ? 'is-error' : ''}`}
            name="password_confirmation" 
            type="password" 
            id="passwordconf" 
            value={formData.password_confirmation} 
            onChange={handleChange}/>
        </div>
        { errors.password_confirmation && <p className="error-message">{errors.password_confirmation}</p> }
        <div className="form-field">
          <input 
            id="submit-button" 
            type="submit" 
            value="Register"/>
        </div>
      </form>
    </div>
  )
}

export default Register
