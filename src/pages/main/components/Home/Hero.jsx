import React from 'react'
import "./home.css"
import Chart from '../../../../components/Total Chart/Chart'
const Hero = () => {


  return (
    <div className='home-hero-body'>
      <div className='home-hero-card'>
        <Chart />
      </div>
    </div>
  )
}

export default Hero