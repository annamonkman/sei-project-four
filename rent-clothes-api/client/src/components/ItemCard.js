import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ image_01: image01, id, brand, name, price, rrp, size }) => {
  return (
    <>
      <Link to={`/clothes/${id}`}>
        <div className="item-card-wrapper">
        
          <div className="item-card-image-wrapper"
            style={{
              backgroundImage: `url(${image01})`,
            }}>
            {/* <img src={`${image01}`} /> */}
          </div>
          <div className="item-card-info-wrapper">
            <p>{brand}</p>
            <p>{name}</p>
            <p>UK {size}</p>
            <p>£{price}</p>
            <p>£{rrp}</p>
          </div>
        
        </div>
      </Link>
    </>
  )
}

export default ItemCard
