import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  console.log(formData, setFormData)

  const handleChange = (event) => {
    // set state when user types

  }
  
  return (
    <div className="register-form-container">
      <form>
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
            className="submit-button" 
            type="submit" 
            value="Register"/>
        </div>
      </form>
    </div>
  )
}

export default Register
