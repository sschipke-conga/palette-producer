import './ProjectContainer.scss';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const ProjectContainer = ({ projects, palettes }) => {
  let displayProjects = null;
  if (projects.length !== 0 && Object.keys(palettes).length !== 0) {
    displayProjects = projects.map((project, index) => {
      return (
        <ProjectCard
          key={'ProjectCard' + index}
          id={project.id}
          palettes={palettes[project.id]}
        />
      )
    })
  }

  return (
    <div className='ProjectContainer'>
      <div className='add-project-container'>
        <IoIosAddCircleOutline className='add-project-icon' />
      </div>
      {displayProjects}
    </div >
  )
}

export default ProjectContainer;

ProjectContainer.propTypes = {

}
