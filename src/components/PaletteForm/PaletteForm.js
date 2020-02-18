
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../util/apiCalls";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCurrentPalette, setAllPalettes } from "../../actions/index";
import "./PaletteForm.test";



class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: '',
      projectName: '',
      error: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { username, password, error } = this.state;
    const user = {
      username,
      password
    };
  };

  render() {
    const { paletteName, projectName, error, isLoggedIn } = this.state;

    let loginErrrorClass = error ? "input-error" : "";
    return (
      <form onSubmit={this.handleSubmit}>
        {error ? <p className="error-message">{error}</p> : null}
        <div className="form-label-input-div">
          <label htmlFor="password">Password</label>
          <select value={paletteName} 
          onChange={this.handleChange} id="rank">
            <option value="CreateNew" defaultValue>Create a new project</option>
            <option value="Jedi Knight">Jedi Knight</option>
            <option value="Jedi Master">Jedi Master</option>
          </select>
        </div>
        <div className="form-label-input-div">
          <label htmlFor="paletteName">Palette Name</label>
          <input
            type="text"
            className={loginErrrorClass}
            placeholder="Enter your username"
            id="paletteName"
            required
            value={paletteName}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Save Palette</button>
      </form>
    );
  }
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPalette,
      setAllPalettes
    },
    dispatch
  );

export const mapStateToProps = state => ({
  allPalettes: state.allPalettes,
  currentPalette: state.currentPalette,
  user: state.user,
  isMenuActive: state.isMenuActive
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteForm);

