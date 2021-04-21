import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth'
import axios from 'axios'
import { useParams } from 'react-router-dom'

// import ItemCard from './ItemCard'

const UserProfile = () => {

  const [userInfo, setUserInfo] = useState(null)
  const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/auth/${params.id}/`,{
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      setUserInfo(data)
      console.log('data', data)
    }
    getData()
  },[])

  console.log('userINfo', userInfo)
  if (!userInfo) return null
  
  return (
    <>
      <div className="user-profile-page-wrapper">
        <h3 className="welcome-back-message">Welcome back {userInfo.first_name}!</h3>
        <div className="account-details-wrapper">
          <h4>Your account details</h4>
          <p>username: {userInfo.username}</p>
          <p>first name: {userInfo.first_name}</p>
          <p>last name: {userInfo.last_name}</p>
          <p>email: {userInfo.email}</p>
        </div>
        <div className="wishlist-wrapper">
          <h4>Your wishlist:</h4>
          <div className="wishlist-items-cards-list">
            {/* {userInfo.filter(item => {
              return <ItemCard key={item.wishlist_items} {...item} />
            })} */}
          </div>
          <button className="remove-from-wishlist-button">Remove from wishlist</button>
        </div>
        <div className="rented-items-wrapper">
          <h4>Your Rented items:</h4>
          <div className="rented-items-cards-list">

          </div>
          <Link to="/checkout" className="go-to-checkout-button">Go to checkout</Link>
        </div>
        
      </div>
    </>
  )
}

export default UserProfile
