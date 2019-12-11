import './PaletteCard.scss';
import React from 'react';
import PropTypes from 'prop-types';

export const PaletteCard = ({ select, project, palette }) => {

  const colors = [palette.color1, palette.color2, palette.color3, palette.color4, palette.color5];

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
    <div className='PaletteCard' id={palette.id} name={palette.name} onClick={() => select(project, palette)}>
      {displayColors}
    </div >
  )
}

export default PaletteCard;

PaletteCard.propTypes = {

}
