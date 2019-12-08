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
    } catch ({message}) {this.setState({hasError: true, error: message})}
  }

  componentDidMount() {

  }

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
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
        <button type="submit">Login</button>
    {this.state.hasError && <p>{this.state.error}</p>}
      </form>
    );
  }
}

export default LoginForm;