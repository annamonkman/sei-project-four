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
  
  return (
    <div className="register-form-container">
      <form>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input name="username" type="text" id="username"/>
        </div>
        <div className="form-field">
          <label htmlFor="firstname">First Name</label>
          <input name="first_name" type="text" id="firstname" />
        </div>
        <div className="form-field">
          <label htmlFor="lastname">Last Name</label>
          <input name="last_name" type="text" id="lastname"/>
        </div>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input name="email" type="email" id="email"/>
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password"/>
        </div>
        <div className="form-field">
          <label htmlFor="passwordconf">Confirm Your Password</label>
          <input name="password_confirmation" type="password" id="passwordconf"/>
        </div>
        
      </form>
    </div>
  )
}

export default Register
