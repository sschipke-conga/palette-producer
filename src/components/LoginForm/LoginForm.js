import React, {Component} from 'react';
import {loginUser} from '../../util/apiCalls';
import './LoginForm.scss';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      hasError: false,
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSumbit = async (e) => {
    e.preventDefault()
    const {username, password, hasError, error
    } = this.state
    const user = {
      username,
      password
    }

    try {
      let res = await loginUser(user)
      console.log(res)
    } catch ({message}) {this.setState({error: message})}
  }

  componentDidMount() {

  }

  render() {

    return (
      <form onSubmit={this.handleSumbit}>
        <div className="form-label-input-div">
          <label  htmlFor="username">Username
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
          <label htmlFor="password">Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Login</button>
    {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}

export default LoginForm;