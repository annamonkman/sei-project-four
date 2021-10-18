import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className="home-wrapper">
      <ul className="home-images-ul">
        <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg1"><div className="home-img-label">Dresses</div></div></Link></li>
        <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg2"><div className="home-img-label">Tops</div></div></Link></li>
        <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg3"><div className="home-img-label">Skirts</div></div></Link></li>
        <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg4"><div className="home-img-label">Trousers</div></div></Link></li>
        <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg5"><div className="home-img-label">Sweaters</div></div></Link></li>
        <li className="home-images-list-items"><Link to='/clothes/'><div className="home-image himg6"><div className="home-img-label">Coats/Jackets</div></div></Link></li>
      </ul>
    </div>
  )

}

export default Home
