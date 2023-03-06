import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='login-body'>
      <div className='login-card'>
        <form className='login-form'>
          <label htmlFor="username">Username:</label>
          <input type="text" />
          <label htmlFor="password">Password:</label>
          <input type="password" />
          <button className="login-button button" type="submit">Log In</button>
        </form>
        <a href='home'>
          Home
        </a>
      </div>
    </div>
  )
}

export default Login