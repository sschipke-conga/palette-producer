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
      isFormComplete: true,
      passwordError: false,
      error: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSumbit = async (e) => {
    e.preventDefault()
    const {password, confirmPassword, username} = this.state
    if (username && password === confirmPassword) {
      const newUser = {
        username,
        password
      }
      try {
        let res = await createNewUser(newUser)
        console.log(res)
        this.setState({username: '', password: '', confirmPassword: '', isFormComplete:true})
      } catch ({message}) { this.setState({hasError: true, error: message})}
    } else {
      this.setState({ error: 'Passwords do not match', passwordError: true})
    }
  };

  render() {
    const {error, passwordError} = this.state;
    const passwordErrorClass = passwordError ? "input-error" : "";
    return (
      <form onSubmit={this.handleSumbit}>
        <p className="form-message">Create an account to save your projects and the palettes you generate!</p>
        <div className="form-label-input-div">
          <label htmlFor="username">Username
            </label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            required
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-label-input-div">
          {passwordError ? (<label className="error-message" htmlFor="password">{error}
          </label>) : (<label htmlFor="password"> Password
            </label>)}
          <input
            className={passwordErrorClass}
            type="password"
            placeholder="Enter your password"
            id="password"
            minLength="8"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-label-input-div">
          {passwordError ? (<label className="error-message" htmlFor="confirmPassword">{error}
          </label>) : (<label htmlFor="confirmPassword"> Confirm your password
            </label>)}
          <input
            className={passwordErrorClass}
            type="password"
            placeholder="Re-enter your password"
            id="confirmPassword"
            minLength="8"
            required
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">
          Sign Up!
        </button>
      </form>
    );
  }
}

export default SignupForm;