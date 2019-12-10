import React, {Component} from 'react';
import {loginUser} from '../../util/apiCalls';
import './LoginForm.scss';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSumbit = async (e) => {
    e.preventDefault()
    const {username, password, error
    } = this.state
    const user = {
      username,
      password
    }

    try {
      let res = await loginUser(user)
      console.log(res)
      this.setState({username:"", password:"", error:""})
    } catch ({message}) {this.setState({error: message})}
  }

  componentDidMount() {

  }

  render() {
    const {username, password, error} = this.state;
    let loginErrrorClass = error ? "input-error" : "";
    return (
      <form onSubmit={this.handleSumbit}>
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
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;