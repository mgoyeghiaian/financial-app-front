import React from 'react'
import Hero from './Hero'
import Report from './Report'
import Targetgoal from './Targetgoal'
import Profitgoal from "../../../../components/Profitgoal"
import Navbar from '../../../../components/Navbar'
import "./Manage.css"


const Manage = () => {
  return (
    <>
      <div className='manage-body'>
        <div className='manage-left'>
          <Navbar />
        </div>
        <div className='manage-right'>
          <section><Profitgoal /></section>
          <section><Hero /></section>
          <section><Report /></section>
          <section><Targetgoal /></section>
        </div>
      </div>
    </>
  )
}

export default Manage