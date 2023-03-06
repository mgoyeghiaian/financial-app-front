import React from 'react'
import './Users.css'
import Navbar from '../../components/Navbar'
const Users = () => {
  return (
    <div className='users-body'>
      <div className='users-left'>
        <Navbar />
      </div>
      <div className='users-right'>
        <div className='users-report-body'>
          <div className='users-report-card'>
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users