import React, { Component } from 'react';
import './PaletteContainer.test';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoMdSave } from "react-icons/io";


export class PaletteContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentProject= {
        projectName: '',
        paletteName: '',
        colors: {
          color1: '',
          color2: '',
          color3: '',
          color4: '',
          color5: '',
        }
      }
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <main className='PaletteContainer'>
        <header className='PalleteContainer-header'>
          <div>
            <h1
              contenteditable="true"
              className='project-name'
              name='projectName'
              value={this.state.projectName}
              onChange={this.handleChange}>
              `${this.state.projectName}`
            </h1>
            <h2
              contenteditable="true"
              className='palette-name'
              name='paletteName'
              value={this.state.paletteName}
              onChange={this.handleChange}>
              `${this.state.paletteName}`
            </h2>
          </div>
          <div>
            <IoMdSave />
          </div>
        </header>
      </main>
    )
  }
}


export default PaletteContainer;

PalletteContainer.propTypes = {

}







