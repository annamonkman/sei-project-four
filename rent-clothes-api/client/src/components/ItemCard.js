import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ id, brand, name, price, rrp, size }) => {
  return (
    <>
      <div className="item-card-wrapper">
        <Link to={`/clothes/${id}`}>
          <div className="item-card-image-wrapper">
          </div>
          <div className="item-card-info-wrapper">
            <p>{brand}</p>
            <p>{name}</p>
            <p>UK {size}</p>
            <p>£{price}</p>
            <p>£{rrp}</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ItemCard
