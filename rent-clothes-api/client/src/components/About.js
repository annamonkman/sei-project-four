import React from 'react'

import starstamp from '../assets/starstamp.png'

const About = () => {

  return (
    <div className="how-it-works-page-wrapper">
      <img className="starstamp star03" src={starstamp} alt="star stamp" />
      <img className="starstamp star04" src={starstamp} alt="star stamp" />
      <div className="how-it-works-info">
        <h2 className="how-it-works-title">About Us</h2>
        <p>We founded Carousel Collective to counteract the culture of fast fashion. Renting clothing is an environmentally friendly way of consuming and enjoying high quality items of clothing with minimal environmental impact. </p>
        <p>We keep our collection stocked with the latest cutting-edge designers so you can look sharp whilst helping the environment. </p>
        <p>We appreciate the labour that goes into a high-quality item of clothing. Like a carousel we can allow an item to circulate and live a full life rather than be stored away only to be worn every other month. Or worse - thrown away! </p>
        <p>True to our word, any actions we do that impact the environment (such as washing the clothing and delivering it) we offset through our partnership with a tree planting scheme. </p>
      </div>
    </div>
  )
}

export default About
