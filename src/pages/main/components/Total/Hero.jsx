import React from 'react'
import Chart from '../../../../components/Total Chart/Chart'
import { useState } from 'react';


const Hero = () => {

  return (
    <div className='total-hero-body'>
      <div className='total-hero-card'>
        <Chart />
      </div>
    </div>
  )
}

export default Hero