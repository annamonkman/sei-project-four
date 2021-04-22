import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayloadFromToken } from '../helpers/auth'
import axios from 'axios'
import { useParams } from 'react-router-dom'

// import ItemCard from './ItemCard'

const UserProfile = () => {


  const [item, setItem] = useState({
    id: '',
    name: '',
    image_01: '',
    image_02: '',
    image_03: '',
    garment_type: '',
    brand: '',
    size: '',
    price: '',
    rrp: '',
    colour: '',
    material: '',
    is_available: '',
    description: '',
    current_renter: '',
  })

  const [items, setItems] = useState(null)

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/items/${params.id}`)
        setItem(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/items/')
        setItems(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  if (!item) return null

  const handleRemoveFromWishlist = async event => {
    const payload = getPayloadFromToken()
    // PUT request to api/auth/id of user/wishlist/
    // need id of item/user?, wishlist_items: id of item?

    console.log('ETV', event.target.value)
    try {
      await axios.put(`/api/auth/${payload.sub}/wishlist/`, { id: item.id }, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
      )
    } catch (err) {
      console.log(err)
    }
    
  }

  console.log('userINfo', userInfo)
  if (!userInfo) return null
  
  return (
    <>
      <div className="user-profile-page-wrapper">
        <h2 className="welcome-back-message">Welcome back {userInfo.first_name}!</h2>
        <div className="account-details-wrapper">
          <h3>Your account details:</h3>
          <p><span className="user-detail">Username:</span> {userInfo.username}</p>
          <p><span className="user-detail">First Name:</span> {userInfo.first_name}</p>
          <p><span className="user-detail">Last Name:</span> {userInfo.last_name}</p>
          <p><span className="user-detail">Email:</span> {userInfo.email}</p>
        </div>
        <div className="wishlist-wrapper">
          <h3>Your wishlist:</h3>
          <div className="wishlist-items-cards-list">
            {/* {userInfo.wishlist_items.map(item => {
              console.log('ITEMMAP', item)
              return <ItemCard key={item} />
            })} */}
            {items.map(item => {
              console.log('item.id', item.id)
              console.log('userInfo.wishlist_items', userInfo.wishlist_items)
              if (userInfo.wishlist_items.includes(item.id)) {
                return (
                  <div className="userprofile-wishlist-rent-item">
                    {/* <img src={`${item.image_01}`} width="50px"/> */}
                    <div className="wishlist-rented-image" style={{
                      backgroundImage: `url(${item.image_01})`,
                    }}></div>
                    <span>{item.name}</span>
                    <span>UK {item.size}</span>
                    <span>£{item.price}</span>
                    <button className="remove-from-wishlist-button" onClick={handleRemoveFromWishlist} value="removeFromWishlist">X</button>
                  </div>
                )
                
              }
            })}
          </div>
        </div>
        <div className="rented-items-wrapper">
          <h3>Your Rented items:</h3>
          <div className="rented-items-cards-list">
            {items.map(item => {
              if (item.current_renter === userInfo.id) {
                return (
                  <div className="userprofile-wishlist-rent-item">
                    {/* <img src={`${item.image_01}`} width="50px"/> */}
                    <div className="wishlist-rented-image" style={{
                      backgroundImage: `url(${item.image_01})`,
                    }}></div>
                    <span>{item.name}</span>
                    <span>UK {item.size}</span>
                    <span>£{item.price}</span>
                    <button className="remove-from-rented-button" value="removeFromRented">X</button>
                  </div>
                )
              }
            })}
          </div>
          <Link to="/checkout" className="go-to-checkout-button" style={{ textDecoration: 'none' }}>Go to checkout</Link>
        </div>
        
      </div>
    </>
  )
}

export default UserProfile
