import React from 'react';
import {Route, NavLink, Link} from 'react-router-dom';
import ReactModal from 'react-modal';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import './Modal.scss';

export const Modal = () => {
  return (
    <>
      <Link to='/'>
        <div className="modal-background">
          <div className='modal-backdrop'></div>
        </div>
      </Link>
      <div className='modal-div'>
        <ul className='tabs'>
          <NavLink to='/login' className='modal-link'>
            <li className='modal-tab'>Log in</li>
          </NavLink>
          <NavLink to='/signup' className='modal-link'>
            <li className='modal-tab'>Sign up</li>
          </NavLink>
        </ul>
        <Route exact path='/login' render={() => <LoginForm />}
        />
        <Route exact path='/signup' render={() => <SignupForm />}
        />
      </div>
    </>
  )
}

export default Modal;