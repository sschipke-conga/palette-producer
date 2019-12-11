import './ProjectCard.scss';
import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ProjectContainer from '../ProjectContainer/ProjectContainer';

export const ProjectCard = ({ project, select, palettes }) => {

  console.log(palettes)

  const displayPalettes = palettes.map((palette, index) => {
    return (
      <PaletteCard
        key={'PaletteCard' + index}
        project={project}
        select={select}
        palette={palette}
      />
    )
  })

  return (
    <div className='ProjectCard' id={project.d} name={project.name}>
      <h3>{project.name}</h3>
      <div className='add-palette-container' onClick={() => select(project, {name: ''})}>
        <IoIosAddCircleOutline className='add-palette-icon' />
      </div>
      {displayPalettes}
    </div >
  )
}

export default ProjectCard;

ProjectCard.propTypes = {

}
