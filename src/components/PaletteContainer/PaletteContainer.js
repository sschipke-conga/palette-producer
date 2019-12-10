import React, { Component } from 'react';
import './PaletteContainer.scss';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoMdSave } from "react-icons/io";
import { IoIosRefresh } from "react-icons/io";
import PaletteCard from '../PaletteCard/PaletteCard';

export class PaletteContainer extends Component {
  constructor() {
    super();
    this.state = {
      projectName: 'Enter project name',
      paletteName: 'Enter palette name',
      color1: {
        hexCode: '',
        isLocked: false
      },
      color2: {
        hexCode: '',
        isLocked: false
      },
      color3: {
        hexCode: '',
        isLocked: false
      },
      color4: {
        hexCode: '',
        isLocked: false
      },
      color5: {
        hexCode: '',
        isLocked: false
      }
    }
  }

  componentDidMount = () => {
    this.randomizePalette();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.forceUpdate();
  }

  changeColor = (colorN, hexCode) => {
    console.log(colorN, hexCode)
    this.setState({
      [colorN]: {
        hexCode,
        isLocked: false
      }
    })
  }

  toggleLock = (colorN, hexCode) => {
    this.setState({
      [colorN]: {
        hexCode,
        isLocked: !this.state[colorN].isLocked
      }
    })
  }

  generateRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  randomizePalette = () => {
    for (let parameter of ["color1", "color2", "color3", "color4", "color5"]) {
      if (!this.state[parameter].isLocked) {
        this.setState({
          [parameter]: {
            hexCode: this.generateRandomHex(),
            isLocked: false
          }
        })
      }
    }
  }

  displayPalettes = colors => {
    const colorKeys = Object.keys(colors);
    return colorKeys.map((colorKey, index) => {
      return (
        <PaletteCard
          key={index}
          index={'color' + (index + 1)}
          color={colors[colorKey].hexCode}
          isLocked={colors[colorKey].isLocked}
          changeColor={this.changeColor}
          toggleLock={this.toggleLock}
        />
      )
    })
  }

  render() {
    return (
      <main className='PaletteContainer'>
        <header className='PaleteContainer-header'>
          <div className='PaleteContainer-names'>
            <input
              type='text'
              className='project-name'
              name='projectName'
              value={this.state.projectName}
              onChange={this.handleChange} />
            <input
              type='text'
              className='palette-name'
              name='paletteName'
              value={this.state.paletteName}
              onChange={this.handleChange} />
          </div>
          <div className='icon-container'>
            <IoIosRefresh className='randomize-icon' onClick={this.randomizePalette} />
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







