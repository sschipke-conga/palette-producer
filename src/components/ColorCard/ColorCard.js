import './ColorCard.scss';
import React, {Component} from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCurrentPalette } from "../../actions/index";
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types'
import { IoIosLock, IoIosUnlock } from 'react-icons/io';


export class ColorCard extends Component {
  toggleLock = () => {
    const { index, setCurrentPalette } = this.props;
    const updatedPalette = this.props.currentPalette;
    updatedPalette[index].isLocked = !updatedPalette[index].isLocked;
    setCurrentPalette(updatedPalette)
  }

  changeColor = (hexCode) => {
    const {index, isLocked, currentPalette, setCurrentPalette } = this.props;
    const updatedPalette = currentPalette;
    updatedPalette[index].hexCode = hexCode
    setCurrentPalette(updatedPalette);
  }

  render() {
    const {isLocked, index, color} = this.props
    const colorStyles = {
      background: color
    }
    return (
    <div className='ColorCard'>
      <div className='color' style={colorStyles}>
        {isLocked ?
          <IoIosLock className='lock' onClick={() => this.toggleLock()} /> :
          <IoIosUnlock className='lock' onClick={() => this.toggleLock()} />}
        <p className='hex'>{this.props.color}</p>
      </div>
      <div className='picker-container'>
        {isLocked ?
        null :
        <ChromePicker className='color-picker' disableAlpha={true} width={170} color={color} onChange={({ hex }) => this.changeColor(hex)} />
        }
      </div>
    </div >
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorCard);

ColorCard.propTypes = {
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  setCurrentPalette: PropTypes.func.isRequired,
  currentPalette: PropTypes.array.isRequired
}
