import React from 'react'
// import Hero from './Hero'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import "./income.css"
const Income = () => {
  return (
    <div className='income-body'>
      <div className='income-left'>
        <Navbar />
      </div>
      <div className='income-right'>
        <Report />
      </div>
    </div>

  )
}

export default Income