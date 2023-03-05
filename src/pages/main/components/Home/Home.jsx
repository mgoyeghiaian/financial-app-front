import React from 'react'
import Hero from './Hero'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import Targetgoal from './Targetgoal'
import "./home.css"
import Profitgoal from '../../../../components/Profitgoal'

const Home = () => {
  return (
    <>
      <div className='home-body'>
        <div className='home-left'>
          <Navbar />
        </div>
        <div className='home-middle'>
          <div><Profitgoal /></div>
          <div><Hero /></div>
        </div>
        <div className='home-right'>
          <div><Targetgoal /></div>
        </div>
        <div className='home-report'>
          <Report />
        </div>
      </div>
    </>
  )
}

export default Home