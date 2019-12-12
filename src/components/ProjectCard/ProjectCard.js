import './ProjectCard.scss';
import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import ProjectContainer from '../ProjectContainer/ProjectContainer';

export const ProjectCard = ({ project, select, palettes, removePalette, removeProject }) => {
  let displayPalettes = 'Add some palettes'
  if (palettes) {
    displayPalettes = palettes.map((palette, index) => {
      return (
        <PaletteCard
          key={'PaletteCard' + index}
          project={project}
          select={select}
          palette={palette}
          removePalette={removePalette}
        />
      )
    })
  }

  return (
    <div className='ProjectCard' id={project.d} name={project.name}>
      <h3 className="projectCard-header-name">{project.name}</h3>
      <div className='add-palette-container' onClick={() => select(project, { name: '' })}>
        <IoIosAddCircleOutline className='add-palette-icon' />
      </div>
      {displayPalettes}
      <IoIosCloseCircleOutline className='delete-project'
        id={project.id}
        onClick={removeProject} />
    </div >
  )
}

export default ProjectCard;

ProjectCard.propTypes = {

}
