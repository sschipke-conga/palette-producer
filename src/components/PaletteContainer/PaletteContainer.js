import React, { Component } from 'react';
import './PaletteContainer.scss';
import PropTypes from 'prop-types';
import { IoMdSave } from "react-icons/io";
import { IoIosRefresh } from "react-icons/io";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {generateRandomHex} from '../../util/helperFuncs'
import {setCurrentPalette} from '../../actions/index'
import PaletteForm from '../PaletteForm/PaletteForm'
import ColorCard from '../ColorCard/ColorCard';

export class PaletteContainer extends Component {
  randomizePalette = () => {
    const {setCurrentPalette, currentPalette} = this.props;
    const updatedPalette = currentPalette.map(item => {
      if(!item.isLocked) {
        item.hexCode = generateRandomHex()
      }
      return item
    })
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
    const {user, selectedPaletteInfo} = this.props
    return (
      <main className="PaletteContainer">
        <section className="PaletteContainer-section">
          {this.displayPalettes()}
        </section>
        <div className="icon-container">
            <IoIosRefresh
              className="randomize-icon"
              onClick={this.randomizePalette}
            />
          </div>
          {user && <PaletteForm />}
      </main>
    );
  }
}



export const mapStateToProps = state => ({
  allPalettes: state.allPalettes,
  allProjects: state.allProjects,
  currentPalette: state.currentPalette,
  selectedPaletteInfo: state.selectedPaletteInfo,
  selectedProjectInfo: state.selectedProjectInfo,
  user: state.user,
  isMenuActive: state.isMenuActive
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







