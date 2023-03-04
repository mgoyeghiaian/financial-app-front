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
        <div className='income-right'>
          <section><Profitgoal /></section>
          <section><Hero /></section>
          <section><Report /></section>
          <section><Targetgoal /></section>
        </div>
      </div>
    </>
  )
}

export default Income