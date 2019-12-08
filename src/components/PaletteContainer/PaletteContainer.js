import React, { Component } from 'react';
import './PaletteContainer.scss';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoMdSave } from "react-icons/io";
import PaletteCard from '../PaletteCard/PaletteCard';

export class PaletteContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectName: '',
      paletteName: '',
      color1: '',
      color2: '',
      color3: '',
      color4: '',
      color5: ''
    }
  }

  componentDidMount = () => {
    this.randomizePalette();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeColor = (colorN, hexCode) => {
    this.setState({ [colorN]: hexCode })
  }

  generateRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  randomizePalette = () => {
    this.setState({
      color1: this.generateRandomHex(),
      color2: this.generateRandomHex(),
      color3: this.generateRandomHex(),
      color4: this.generateRandomHex(),
      color5: this.generateRandomHex()
    })
  }

  displayPalettes = colors => {
    const colorKeys = Object.keys(colors);
    return colorKeys.map(colorKey => {
      return (
        <PaletteCard
          color={colors[colorKey]}
          changeColor={this.changeColor}
          isLocked={false}
        />
      )
    })
  }

  render() {
    return (
      <main className='PaletteContainer'>
        <header className='PaleteContainer-header'>
          <div className='PaleteContainer-names'>
            <h1
              contentEditable="true"
              className='project-name'
              name='projectName'
              value={this.state.projectName}
              onChange={this.handleChange}>
              {this.state.projectName === '' ? 'Enter project name' : this.state.projectName}
            </h1>
            <h2
              contentEditable="true"
              className='palette-name'
              name='paletteName'
              value={this.state.paletteName}
              onChange={this.handleChange}>
              {this.state.paletteName === '' ? 'Enter palette name' : this.state.paletteName}
            </h2>
          </div>
          <div className='icon-container'>
            <IoMdSave className='save-icon' />
          </div>
        </header>
        <section className='PaletteContainer-section'>
          {this.displayPalettes([this.state.color1, this.state.color2, this.state.color3, this.state.color4, this.state.color5])}
        </section>
      </main>
    )
  }
}


export default PaletteContainer;

PaletteContainer.propTypes = {

}







