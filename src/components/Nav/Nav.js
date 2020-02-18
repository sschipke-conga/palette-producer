import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss'
import logo from '../../assets/logo.svg';

const Nav = () =>
  <nav>
    <img className="logo" src={logo} alt="logo" />
    <NavLink exact to="/login">Account</NavLink>
  </nav>

export default Nav;