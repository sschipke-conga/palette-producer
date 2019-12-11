import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss'

const Nav = () =>
  <nav>
    <img className="logo" src="../../assets/2026954.svg" alt="logo" />
    <NavLink exact to="/signup">Account</NavLink>
  </nav>

export default Nav;