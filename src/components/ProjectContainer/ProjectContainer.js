import './ProjectContainer.scss';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const ProjectContainer = ({ select, projects, palettes, removePalette, removeProject }) => {
  let displayProjects = null;
  if (projects.length !== 0 && palettes.length !== 0) {
    displayProjects = projects.map((project, index) => {
      return (
        <ProjectCard
          key={'ProjectCard' + index}
          project={project}
          palettes={palettes[index]}
          select={select}
          removePalette={removePalette}
          removeProject={removeProject}
        />
      )
    })
  }

  return (
    <div className='ProjectContainer'>
      <div className='add-project-container' onClick={() => select({name: ''}, {name: ''})}>
        <IoIosAddCircleOutline className='add-project-icon' />
      </div>
      {displayProjects}
    </div >
  )
}

export default ProjectContainer;

ProjectContainer.propTypes = {

}
