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
        <h1>Users</h1>
      </div>
    </div>
  )
}

export default Users