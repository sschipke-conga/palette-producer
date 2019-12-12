import './PaletteCard.scss';
import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import PropTypes from 'prop-types';

export const PaletteCard = ({ select, project, palette, removePalette }) => {

  const colors = [palette.color1, palette.color2, palette.color3, palette.color4, palette.color5];

  const displayColors = colors.map((color, index) => {
    const colorStyles = {
      background: color,
    }
    return (
      <div key={index} className='colorblocks' style={colorStyles}>
      </div>
    )
  })

  return (
    <div className="PaletteCard-div">
      {palette.name && <h4 className="paletteCard-header">{palette.name}</h4>}
      <div
        className="PaletteCard"
        id={palette.id}
        name={palette.name}
        onClick={() => select(project, palette)}
      >
        {displayColors}
      </div>
      <IoIosCloseCircleOutline className='delete-palette'
        id={project.id}
        onClick={removePalette} />
    </div>
  );
}

export default PaletteCard;

PaletteCard.propTypes = {

}
