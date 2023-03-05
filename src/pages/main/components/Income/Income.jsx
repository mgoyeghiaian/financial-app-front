import React from 'react'
import Hero from './Hero'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import Targetgoal from './Targetgoal'
import "./income.css"
import Profitgoal from '../../../../components/Profitgoal'
const Income = () => {
  return (
    <>
      <div className='income-body'>
        <div className='income-left'>
          <Navbar />
        </div>
        <div className='income-middle'>
          <div><Profitgoal /></div>
          <div><Hero /></div>
        </div>
        <div className='income-right'>
          <div><Targetgoal /></div>
        </div>
        <div className='income-report'>
          <Report />
        </div>
      </div>
    </>
  )
}

export default Income