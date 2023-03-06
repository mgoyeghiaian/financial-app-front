import React from 'react'
import Hero from './Hero'
import Report from './Report'
import Targetgoal from './Targetgoal'
import Navbar from '../../../../components/Navbar'
import Profitgoal from '../../../../components/Profitgoal'

import "./total.css"

const Total = () => {
  return (
    <>
      <div className='total-body'>
        <div className='total-left'>
          <Navbar />
        </div>
        <div className='total-middle'>
          <div className="total-mid-ch1"><Profitgoal /></div>
          <div className="total-mid-ch2"><Hero /></div>
        </div>
        <div className='total-right'>
          <Targetgoal />
        </div>
        <div className='total-report'>
          <Report />
        </div>
      </div>
    </>
  )
}

export default Total