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
        <div className='home-right'>
          <section><Profitgoal /></section>
          <section><Hero /></section>
          <section><Report /></section>
          <section><Targetgoal /></section>
        </div>
      </div>
    </>
  )
}

export default Home