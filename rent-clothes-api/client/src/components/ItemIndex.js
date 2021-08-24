import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ItemCard from './ItemCard'

const ItemIndex = () => {
  const [items, setItems] = useState(null)
  console.log('items', items)

  useEffect( () => {
    const getData = async () => {
      const response = await axios.get('/api/items')
      setItems(response.data)
    }
    getData()
  }, [])

  if (!items) return null
  //--------------------------------------------------------------------RETURN
  return (
    <>
      <div className="index-page-wrapper">
        <div className="index-filters-wrapper">
          
        </div>
        <div className="items-grid-wrapper">
          { items.map( item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ItemIndex
