import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../../util/apiCalls';
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {setUser} from '../../actions'
import './LoginForm.scss';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {username, password} = this.state
    const {setUser} = this.props
    const user = {
      username,
      password
    }

    try {
      let res = await loginUser(user)
      setUser({user_id: res.id, username: res.username})
      this.setState({username:"", password:"", error:""})
      this.props.loadProjects()
    } catch ({message}) {this.setState({error: message})}
  }

  render() {
    const {username, password, error} = this.state;
    const {user} = this.props
    if(user) {
      return <Redirect to="/" />
    }
    let loginErrrorClass = error ? "input-error" : "";
    return (
      <form onSubmit={this.handleSubmit}>
        {error ? (<p className="error-message">{error}</p>) : (<p className="form-message">Good to see you, welcome back!</p>)}
        <div className="form-label-input-div">
          <label  htmlFor="username">Username
          </label>
          <input
            type="text"
            className={loginErrrorClass}
            placeholder="Enter your username"
            id="username"
            required
            value={username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-label-input-div">
          <label htmlFor="password">Password
          </label>
          <input
            type="password"
            className={loginErrrorClass}
            placeholder="Enter your password"
            id="password"
            minLength="8"
            required
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <button className="user-button" type="submit">Login</button>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser
    },
    dispatch
  );

export const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  loadProjects: PropTypes.func.isRequired
}
