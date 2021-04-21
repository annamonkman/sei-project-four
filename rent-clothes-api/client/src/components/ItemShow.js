import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated, getPayloadFromToken } from '../helpers/auth'


const ItemShow = () => {

  const params = useParams()
  console.log(params)

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
  // const [userInfo, setUserInfo] = useState(null)
  

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


  console.log('item', item)

  if ( !item ) return null

  const handleAddToWishlist = async event => {
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

  const handleRentNow = async event => {
    console.log('ETV', event.target.value)
    console.log('rent now function')
    // delete item.id
    const payload = getPayloadFromToken()
    // PUT to /api/items/idofitem/currentrenter/
    // need all data from item + current_renter: id of user
    // create new object and spread in this , get rid of id -- delete object name and key 
    console.log('item.id', item.id)
    const itemToUpdate = { ...item }
    delete itemToUpdate.id
    itemToUpdate.current_renter = payload.sub
    try {
      await axios.put(`/api/items/${item.id}/currentrenter/`, itemToUpdate, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
      )
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <div className="item-show-page-wrapper">
      <div className="item-show-image-wrapper">
        <img src={ item.image_01 } alt={ `image of ${item.name}` } />
        <img src={ item.image_02 } alt={ `image of ${item.name}` } />
        <img src={ item.image_03 } alt={ `image of ${item.name}` } />
      </div>
      <div className="item-show-info-wrapper">
        <p className="designer">{ item.brand }</p>
        <p className="name-of-item">{ item.name }</p>
        <p className="size">UK { item.size }</p>
        <div className="pricing">
          <p className="price">Rent for £{ item.price }</p>
          <p className="rrp">Market Value: £{ item.rrp }</p>
        </div>
        
        { userIsAuthenticated() ?
          <div className="rent-and-add-to-wishlist-buttons-wrapper">
            <button className="rent-now-button" onClick={handleRentNow} value="rentNow">Rent Now</button>
            <button className="add-to-wishlist-button" onClick={handleAddToWishlist} value="addToWishlist">Add to Wishlist</button>
          </div>
          : 
          <div className="rent-and-add-to-wishlist-buttons-wrapper">
            <h3><Link to={'/sign-in'} className="login-or-reg-button">Login or Register</Link> to Rent item or add to wishlist</h3>
          </div>
        }
        <p className="item-info">Item Info</p>
        <p className="description">{ item.description }</p>
        <p className="color">{ item.colour }</p>
        <p className="material">{ item.material }</p>
        
        
        

      </div>

    </div>
  )
}

export default ItemShow
