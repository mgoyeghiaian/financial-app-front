import React from 'react'
import "./Navbar.css"
import logo from "../assets/Logo.png"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className='navbar-body'>
        <div className='nav-logo'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <h3>Financal app</h3>
        </div>
        <div className='nav-manage'>
          <h2>Manage</h2>
          <div className='nav-manage-list'>
            <ul>
              <li><NavLink to="/home">Home</NavLink ></li>
              <li><NavLink to="/income">Income</NavLink ></li>
              <li><NavLink to="/expenses">Expenses</NavLink ></li>
              <li><NavLink to="/total">Total</NavLink ></li>
              <li><NavLink to="/manage">Manage</NavLink ></li>
            </ul>
          </div>
        </div>

        <div className='nav-preferences'>
          <h2>Preferences</h2>
          <div className='nav-preferences-list'>
            <ul>
              <li><button to="/home">Theme</button ></li>
              <li><NavLink to="/users">Users</NavLink ></li>
            </ul>
          </div>
        </div>
      </div >
    </>
  )
}

export default Navbar