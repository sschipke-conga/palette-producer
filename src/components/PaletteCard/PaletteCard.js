import './PaletteCard.scss';
import React from 'react';
import ColorPicker from '../ColorPicker/ColorPicker'
import PropTypes from 'prop-types'
import { IoIosLock, IoIosUnlock } from 'react-icons/io';

export const PaletteCard = ({ color, changeColor, isLocked }) => {

  const colorStyles = {
    background: color,
  }

  return (
    <div className='PaletteCard'>
      <div className='color' style={colorStyles}>
        {isLocked ? <IoIosLock className='lock' /> : <IoIosUnlock className='lock' />}
        <p className='hex'>{color}</p>
      </div>
      <ColorPicker color={color} />
    </div >
  )
}

export default PaletteCard;

PaletteCard.propTypes = {

}
