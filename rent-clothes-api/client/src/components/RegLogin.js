import React, { useState } from 'react'

const RegLogin = () => {
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
    <div>
      
    </div>
  )
}

export default RegLogin
