import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ItemShow = () => {

  const params = useParams()
  console.log(params)

  const [item, setItem] = useState(null)

  useEffect(() => {
    console.log(item, setItem)
    const getData = async () => {
      const response = await axios.get(`/api/items/${params.id}`)
      setItem(response.data)
    }
    getData()
  }, [])

  // const handleAddToWishlist = async event => {
  //   try {
  //     await axios.put(`/api/auth/${id}/wishlist`, xxxx, {
  //       headers: {
  //         Authorization: `Bearer ${getTokenFromLocalStorage()}`
  //       },
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  if ( !item ) return null
  return (
    <div className="item-show-page-wrapper">
      <div className="item-show-image-wrapper">
        <img src={ item.image_01 } alt={ `image of ${item.name}` } />
        <img src={ item.image_02 } alt={ `image of ${item.name}` } />
        <img src={ item.image_03 } alt={ `image of ${item.name}` } />
      </div>
      <div className="item-show-info-wrapper">
        <p>{ item.brand }</p>
        <p>{ item.name }</p>
        <p>UK { item.size }</p>
        <p>Rent for £{ item.price }</p>
        <p>Market Value: £{ item.rrp }</p>
        <p>Item Info</p>
        <p>{ item.description }</p>
        <p>{ item.colour }</p>
        <p>{ item.material }</p>
        
        <div className="rent-and-add-to-wishlist">
          <button className="rent-now-button">Rent Now</button>
          <button className="add-to-wishlist-button">Add to Wishlist</button>
        </div>
      </div>

    </div>
  )
}

export default ItemShow
