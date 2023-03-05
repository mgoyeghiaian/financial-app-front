import React from 'react'
import "./Profitgoal.css"
import Pdata from './pg-data'

const Profitgoal = () => {
  return (
    <div className='profit-main' >
      {

        Pdata.map((item, index) => {
          return (
            <div className='profit-card' key={index}>
              <img src={item.img} alt="" />
              <p> {item.type}</p>
              <p>$ {item.amount}</p>
            </div>
          )

        })
      }
    </div>
  )
}

export default Profitgoal