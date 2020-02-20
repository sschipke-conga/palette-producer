import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { toggleMenu } from '../../actions/index'
import { connect } from "react-redux";
import './Nav.scss'
import logo from '../../assets/logo.svg';

export const Nav = ({toggleMenu, user}) =>
  <nav>
    <img className="logo" src={logo} alt="logo" />
    {user && <button onClick={toggleMenu}>Menu</button>}
    {user ? 
    <div>
      <p className="display-username">Welcome, {user.username}!</p>
    </div>
    :
    <NavLink exact to="/login">Account</NavLink>}
  </nav>

export const mapStateToProps = state => ({
  isMenuActive: state.isMenuActive,
  user: state.user
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

Nav.propTypes = {
  user: PropTypes.object,
 toggleMenu: PropTypes.func.isRequired
}