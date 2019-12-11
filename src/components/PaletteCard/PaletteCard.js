import './PaletteCard.scss';
import React from 'react';
import PropTypes from 'prop-types';

export const PaletteCard = ({ colors }) => {

  const displayColors = colors.map(color => {
    const colorStyles = {
      background: color,
    }
    return (
      <div className='colorblocks' style={colorStyles}>
      </div>
    )
  })

  return (
    <div className='PaletteCard'>
      {displayColors}
    </div >
  )
}

export default PaletteCard;

PaletteCard.propTypes = {

}
