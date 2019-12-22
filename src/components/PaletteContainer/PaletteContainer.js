import React, { Component } from 'react';
import './PaletteContainer.scss';
import PropTypes from 'prop-types';
import { IoMdSave } from "react-icons/io";
import { IoIosRefresh } from "react-icons/io";
import ColorCard from '../ColorCard/ColorCard';

export class PaletteContainer extends Component {
  constructor({ userID, currentProject, currentPalette, save }) {
    super();
    this.state = {
      userID,
      color1: {
        hexCode: this.generateRandomHex(),
        isLocked: false
      },
      color2: {
        hexCode: this.generateRandomHex(),
        isLocked: false
      },
      color3: {
        hexCode: this.generateRandomHex(),
        isLocked: false
      },
      color4: {
        hexCode: this.generateRandomHex(),
        isLocked: false
      },
      color5: {
        hexCode: this.generateRandomHex(),
        isLocked: false
      }
    }
  }

  componentDidMount = () => {
    if (!this.state.color1) {
      this.randomizePalette();
    }
  }

  componentWillReceiveProps = () => {
    if (!this.state.color1) {
      this.randomizePalette()
    }
    if (this.props.currentPalette.color1) {
      this.setState({
        color1: {
          hexCode: this.props.currentPalette.color1,
          isLocked: false
        },
        color2: {
          hexCode: this.props.currentPalette.color2,
          isLocked: false
        },
        color3: {
          hexCode: this.props.currentPalette.color3,
          isLocked: false
        },
        color4: {
          hexCode: this.props.currentPalette.color4,
          isLocked: false
        },
        color5: {
          hexCode: this.props.currentPalette.color5,
          isLocked: false
        }
      })
    }
  }

  changeColor = (colorN, hexCode) => {
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
    let hexCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
      if(hexCode.length < 7 ) {
        return this.generateRandomHex()
      }
    return hexCode;
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
        <ColorCard
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
      <main className="PaletteContainer">
        <header className="PaleteContainer-header">
          <div className="PaleteContainer-names">
            <input
              type="text"
              className="project-name"
              name="projectName"
              value={this.props.projectName}
              placeholder="Enter new project name"
              onChange={this.props.handleChange}
            />
            <input
              type="text"
              className="palette-name"
              name="paletteName"
              value={this.props.paletteName}
              placeholder="Enter new palette name"
              onChange={this.props.handleChange}
            />
          </div>
          <div className="icon-container">
            <IoIosRefresh
              className="randomize-icon"
              onClick={this.randomizePalette}
            />
            <IoMdSave
              className="save-icon"
              onClick={() =>
                this.props.save({
                  color1: this.state.color1.hexCode,
                  color2: this.state.color2.hexCode,
                  color3: this.state.color3.hexCode,
                  color4: this.state.color4.hexCode,
                  color5: this.state.color5.hexCode
                })
              }
            />
          </div>
        </header>
        <section className="PaletteContainer-section">
          {this.displayPalettes([
            this.state.color1,
            this.state.color2,
            this.state.color3,
            this.state.color4,
            this.state.color5
          ])}
        </section>
      </main>
    );
  }
}


export default PaletteContainer;

PaletteContainer.propTypes = {

}







