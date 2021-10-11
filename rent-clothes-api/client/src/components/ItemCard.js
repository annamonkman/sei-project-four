import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ image_01: image01, id, brand, name, price, rrp, size }) => {
  return (
    <>
      <Link to={`/clothes/${id}/`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="item-card-wrapper">
        
          <div className="item-card-image-wrapper"
            style={{
              backgroundImage: `url(${image01})`,
            }}>
            {/* <img src={`${image01}`} /> */}
          </div>
          <div className="item-card-info-wrapper">
            <p className="designer">{brand}</p>
            <p className="item-card-name">{name}</p>
            <p>UK {size}</p>
            <div className="item-card-price-wrapper">
              <p>£{price}</p>
              <p className="item-card-rrp">£{rrp}</p>
            </div>
            
          </div>
        
        </div>
      </Link>
    </>
  )
}

export default ItemCard
