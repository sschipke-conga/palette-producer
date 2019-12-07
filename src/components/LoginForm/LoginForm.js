import React, {Component} from 'react';
import {Route, NavLink, Link} from 'react-router-dom';
import ReactModal from 'react-modal';
import './Modal.scss';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {

  }

  render() {
    return (
      <form onSumbit={this.handleSumbit}>
        <input
          type="text"
          placeholder="Enter your name"
          required
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button
        type="submit"
        >Login</button>
      </form>
    );
  }
}