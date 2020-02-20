import React from 'react';
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { toggleMenu } from '../../actions/index'
import { connect } from "react-redux";
import './Nav.scss'
import logo from '../../assets/logo.svg';

export const Nav = ({toggleMenu, user, isMenuActive}) => {
  const buttonText = isMenuActive ? 'Return' : 'My palettes'
  return (
  <nav>
    <Link className="logo-link" to="/">
      <h1 className="header-logo">
        <img className="logo" src={logo} alt="logo" />
        <span className="header-span">
          alette
        </span>
        <img className="logo" src={logo} alt="logo" />
        <span>
          roducer
        </span>
      </h1>
    </Link>
    {user ? 
    <div>
      <p className="display-username">Welcome, {user.username}!</p>
    </div>
    :
    <NavLink className="login-link" exact to="/login">Log in</NavLink>}
    {user && <button className="menu-button" onClick={toggleMenu}>
      {buttonText}
      </button>}
  </nav>
  )
}

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