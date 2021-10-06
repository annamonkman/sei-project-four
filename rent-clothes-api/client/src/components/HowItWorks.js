import React from 'react'

import starstamp from '../assets/starstamp.png'

const HowItWorks = () => {
  return (
    <div className="how-it-works-page-wrapper">
      <img className="starstamp star01" src={starstamp} alt="star stamp" />
      <img className="starstamp star02" src={starstamp} alt="star stamp" />
      <div className="how-it-works-info">
        <h2 className="how-it-works-title">How We Work</h2>
        <p>1. Create an account</p>
        <p>2. Browse our site to discover a range of designer clothing available to rent.</p>
        <p>3. Choose your perfect outfit and Register and Log-in to add it to your basket.  </p>
        <p>4. We will package up your order and deliver it to you within 5 days for standard delivery and 2 days for express delivery.</p>
        <p>5. Enjoy for 7 days, then reseal in the original packaging and send back to us. We will clean the items until good as new, ready for the next customer. </p>
        <p>For refunds, keep the ribbon on the garment to show it has not been worn and return it in the original packaging. You will get a refund within 7 days.</p>
      </div>
      <div className="become-a-lender">
        <h3>Would you like to work with us to become a lender?</h3>
        <p>If you would like to start lending your clothing, please get in contact with us.</p>
      </div>
      
      

      

    </div>
  )
}

export default HowItWorks
