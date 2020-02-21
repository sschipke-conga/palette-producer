import React, { Component } from 'react';
import './PaletteContainer.scss';
import PropTypes from 'prop-types';
import { IoIosRefresh } from "react-icons/io";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {generateRandomHex} from '../../util/helperFuncs'
import {setCurrentPalette} from '../../actions/index'
import { Link } from "react-router-dom";
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

  displayPalette = () => {
    const {currentPalette} = this.props
    return currentPalette.map((color, index) => {
      return (
        <ColorCard
          key={index}
          index={index}
          color={color.hexCode}
          isLocked={color.isLocked}
        />
      )
    })
  }

  render() {
    const {user} = this.props
    return (
      <main className="PaletteContainer">
        <section className="PaletteContainer-section">
          {this.displayPalette()}
        </section>
        <div className="icon-container">
          <IoIosRefresh
            className="randomize-icon"
            onClick={this.randomizePalette}
          />
        </div>
        {user && <PaletteForm />}
        {!user && (
          <h4 className="login-signup-message">
            Please
            <Link to="/login">Login</Link>
            or 
            <Link to="/signup">Sign up</Link>
            to get started!
          </h4>
        )}
      </main>
    );
  }
}



export const mapStateToProps = state => ({
  currentPalette: state.currentPalette,
  user: state.user,
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPalette
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
PaletteContainer.propTypes = {
  user: PropTypes.object.isRequired,
  currentPalette: PropTypes.array.isRequired,
  setCurrentPalette: PropTypes.func.isRequired
}






