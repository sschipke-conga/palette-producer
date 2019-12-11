import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss'
import logo from '../../assets/2026954.svg';

const Nav = () =>
  <nav>
    <img className="logo" src={logo} alt="logo" />
    <NavLink exact to="/signup">Account</NavLink>
  </nav>

export default Nav;