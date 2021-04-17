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
      console.log(response)
    }
    getData()
  }, [])

  return (
    <div className="item-show-page-wrapper">
      <div className="item-show-image-wrapper">
      </div>
      <div className="item-show-info-wrapper">
      </div>
    </div>
  )
}

export default ItemShow
