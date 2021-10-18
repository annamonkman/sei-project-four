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
  
  // const [errors, setErrors] = useState({
  //   username: '',
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  //   password_confirmation: '',
  // })

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
      console.log('>>>>response', response)
    } catch (err) {
      console.log('>>>>err.response', err.response)
      // setErrors(err.response.data.errors)
    }
    
  }
  
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input 
            name="username" 
            type="text" id="username" 
            value={formData.username} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <label htmlFor="firstname">First Name</label>
          <input 
            name="first_name" 
            type="text" 
            id="firstname" 
            value={formData.first_name} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <label htmlFor="lastname">Last Name</label>
          <input 
            name="last_name" 
            type="text" 
            id="lastname" 
            value={formData.last_name} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <label htmlFor="reg-email">Email Address</label>
          <input 
            name="email" 
            type="email" 
            id="reg-email" 
            value={formData.email} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <label htmlFor="reg-password">Password</label>
          <input 
            name="password" 
            type="password" 
            id="reg-password" 
            value={formData.password} 
            onChange={handleChange}/>
        </div>
        <div className="form-field">
          <label htmlFor="passwordconf">Confirm Your Password</label>
          <input 
            name="password_confirmation" 
            type="password" 
            id="passwordconf" 
            value={formData.password_confirmation} 
            onChange={handleChange}/>
        </div>
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
