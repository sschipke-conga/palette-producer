import React, { Component } from 'react';
import './PaletteContainer.scss';
import PropTypes from 'prop-types';
import { IoMdSave } from "react-icons/io";
import { IoIosRefresh } from "react-icons/io";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {generateRandomHex} from '../../util/helperFuncs'
import {setCurrentPalette} from '../../actions/index'
import ColorCard from '../ColorCard/ColorCard';

export class PaletteContainer extends Component {

  // componentDidMount = () => {
  //   const { color1, color2, color3, color4, color5 } = this.state
  //   const {setCurrentPalette} = this.props
  //   const palette = {
  //     color1: color1.hexCode,
  //     color2: color2.hexCode,
  //     color3: color3.hexCode,
  //     color4: color4.hexCode,
  //     color5: color5.hexCode
  //   }
  //   setCurrentPalette(palette)
  // }

  // componentWillReceiveProps = () => {
  //   if (!this.state.color1) {
  //     this.randomizePalette()
  //   }
  //   if (this.props.currentPalette.color1) {
  //     this.setState({
  //       color1: {
  //         hexCode: this.props.currentPalette.color1,
  //         isLocked: false
  //       },
  //       color2: {
  //         hexCode: this.props.currentPalette.color2,
  //         isLocked: false
  //       },
  //       color3: {
  //         hexCode: this.props.currentPalette.color3,
  //         isLocked: false
  //       },
  //       color4: {
  //         hexCode: this.props.currentPalette.color4,
  //         isLocked: false
  //       },
  //       color5: {
  //         hexCode: this.props.currentPalette.color5,
  //         isLocked: false
  //       }
  //     })
  //   }
  // }

  randomizePalette = () => {
    const {setCurrentPalette, currentPalette} = this.props;
    const updatedPalette = currentPalette.map(item => {
      if(!item.isLocked) {
        item.hexCode = generateRandomHex()
      }
      return item
    })
    console.log('random')
    setCurrentPalette(updatedPalette)
  }

  displayPalettes = () => {
    const {currentPalette} = this.props
    return currentPalette.map((color, index) => {
      return (
        <ColorCard
          key={index}
          index={index}
          color={color.hexCode}
          isLocked={color.isLocked}
          name={color.name}
        />
      )
    })
  }

  render() {
    const {currentPalette} = this.props
    return (
      <main className="PaletteContainer">
        <section className="PaletteContainer-section">
          {this.displayPalettes()}
        </section>
        <header className="PaleteContainer-header">
          {/* <div className="PaleteContainer-names">
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
          </div> */}
          <div className="icon-container">
            <IoIosRefresh
              className="randomize-icon"
              onClick={this.randomizePalette}
            />
            {/* <IoMdSave
              className="save-icon"
            /> */}
          </div>
        </header>
      </main>
    );
  }
}



export const mapStateToProps = state => ({
  currentPalette: state.currentPalette
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPalette
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
// PaletteContainer.propTypes = {

// }







