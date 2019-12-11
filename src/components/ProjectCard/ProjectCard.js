import './ProjectCard.scss';
import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ProjectContainer from '../ProjectContainer/ProjectContainer';

export const ProjectCard = ({ palettes, id }) => {

  console.log(palettes)

  const displayPalettes = palettes.map((palette, index) => {
    return (
      <PaletteCard
        key={'PaletteCard' + index}
        id={palette.id}
        colors={[palette.color1, palette.color2, palette.color3, palette.color4, palette.color5]}
      />
    )
  })

  return (
    <div className='ProjectCard' id={id}>
      <div className='add-palette-container'>
        <IoIosAddCircleOutline className='add-palette-icon' />
      </div>
      {displayPalettes}
    </div >
  )
}

export default ProjectCard;

ProjectCard.propTypes = {

}
