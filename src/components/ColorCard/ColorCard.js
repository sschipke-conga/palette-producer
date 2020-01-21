import './ColorCard.scss';
import React from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types'
import { IoIosLock, IoIosUnlock } from 'react-icons/io';

export const ColorCard = ({ index, color, isLocked, changeColor, toggleLock }) => {

  const colorStyles = {
    background: color,
  }

  return (
    <div className='ColorCard'>
      <div className='color' style={colorStyles}>
        {isLocked ?
          <IoIosLock className='lock' onClick={() => toggleLock(index, color)} /> :
          <IoIosUnlock className='lock' onClick={() => toggleLock(index, color)} />}
        <p className='hex'>{color}</p>
      </div>
      <div className='picker-container'>
        <ChromePicker className='color-picker' disableAlpha={true} width={170} color={color} onChange={({ hex }) => changeColor(index, hex)} />
      </div>
    </div >
  )
}

export default ColorCard;

ColorCard.propTypes = {

}
