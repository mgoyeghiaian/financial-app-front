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
              <div>
                <img src={item.img} alt="" />
                <h2> {item.type}</h2>
                <p>$ {item.amount}</p>
              </div>
            </div>
          )

        })
      }
    </div>
  )
}

export default Profitgoal