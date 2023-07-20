import React from 'react'
import './Hero.scss';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  return (
    <div className='Hero'>
      <div className="hero-content center">
        <h2 className='heading'>Exclusive Print and Art-work</h2>
        <p className="subheading">
          Exclusive Art Peices, fir the Exclusivly for you
        </p>
        <button onClick={() => navigate('/category')} className="cta btn-primary">Explore more</button>
      </div>
      </div>
  )
}

export default Hero