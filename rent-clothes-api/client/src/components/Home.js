import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className="home-wrapper">
      <div className="grid-wrapper">
        <ul className="home-images-ul">
          <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg1"></div></Link></li>
          <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg2"></div></Link></li>
          <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg3"></div></Link></li>
          <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg4"></div></Link></li>
          <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg5"></div></Link></li>
          <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg6"></div></Link></li>
        </ul>
      </div>
    </div>
  )

}

export default Home
