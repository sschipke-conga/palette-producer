import './PaletteCard.scss';
import React from 'react';
import ColorPicker from '../ColorPicker/ColorPicker'
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types'
import { IoIosLock, IoIosUnlock } from 'react-icons/io';

export const PaletteCard = ({ index, color, isLocked, changeColor, toggleLock }) => {

  const colorStyles = {
    background: color,
  }

  return (
    <div className='PaletteCard'>
      <div className='color' style={colorStyles}>
        {isLocked ?
          <IoIosLock className='lock' onClick={() => toggleLock(index, color)} /> :
          <IoIosUnlock className='lock' onClick={() => toggleLock(index, color)} />}
        <p className='hex'>{color}</p>
      </div>
      <div className='picker-container'>
        <ChromePicker className='color-picker' disableAlpha={true} width={170} color={color} onChangeComplete={({ hex }) => changeColor(index, hex)} />
      </div>
    </div >
  )
}

export default PaletteCard;

PaletteCard.propTypes = {

}
