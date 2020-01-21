import React, {Component} from 'react';
import {createNewUser} from '../../util/apiCalls';
import {Redirect} from 'react-router-dom';
import './SignupForm.scss'

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      isFormComplete: false,
      passwordError: false,
      hasError: false,
      error: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault()
    const {password, confirmPassword, username} = this.state
    if (password === confirmPassword) {
      this.setState({passwordError:false})
      const newUser = {
        username,
        password
      }
      try {
        let res = await createNewUser(newUser)
        this.setState({username: '', password: '', confirmPassword: '', error:'', hasError: false,isFormComplete:true})
      localStorage.setItem("user", JSON.stringify({user_id: res.id, username: res.username}))
        this.props.loadProjects(res.id)
      } catch ({message}) { this.setState({hasError: true, error: message})}
    } else {
      this.setState({ error: 'Passwords do not match', passwordError: true})
    }
  };

  render() {
    const {error, passwordError, hasError, username, password, confirmPassword, isFormComplete} = this.state;
    if(isFormComplete) {
      return <Redirect to="/" />
    }
    const passwordErrorClass = passwordError ? "input-error" : "";
    const usernameErrorClass = hasError ? "input-error" : "";
    return (
      <form onSubmit={this.handleSubmit}>
        {hasError ? (<p className="error-message">{error}</p>):(<p className="form-message">Create an account to save your projects and the palettes you generate!</p>)}
        <div className="form-label-input-div">
          <label htmlFor="username">Username
            </label>
          <input
            type="text"
            className={usernameErrorClass}
            placeholder="Enter your username"
            id="username"
            required
            value={username}
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
            value={password}
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
            value={confirmPassword}
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