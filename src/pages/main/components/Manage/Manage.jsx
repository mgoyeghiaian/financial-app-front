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
        <div className='manage-middle'>
          <div><Profitgoal /></div>
          <div><Hero /></div>
        </div>
        <div className='manage-right'>
          <div><Targetgoal /></div>
        </div>
        <div className='manage-report'>
          <Report />
        </div>
      </div>
    </>
  )
}

export default Manage