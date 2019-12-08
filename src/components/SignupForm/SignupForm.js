import React, {Component} from 'react';
import {createNewUser} from '../../util/apiCalls';
import './SignupForm.scss'

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      hasError: false,
      error: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = async () => {
    const {password, confirmPassword, username} = this.state
    if (password === confirmPassword) {
      const newUser = {
        username,
        password
      }
      try {
        let res = await createNewUser(newUser)
        console.log(res)
      } catch ({message}) { this.setState({hasError: true, error: message})}
    } else {
      this.setState({ hasError: true})
    }
  };

  render() {
    const {hasError} = this.state;
    return (
      <form>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          required
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          required
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input
          type="password"
          placeholder="Re-enter your password"
          name="confirmPassword"
          required
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleSumbit}>
          Sign Up!
        </button>
        {hasError && <p>Passwords do not match</p>}
      </form>
    );
  }
}

export default SignupForm;