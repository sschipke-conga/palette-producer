import './ProjectContainer.scss';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const ProjectContainer = ({ projects, palettes }) => {
  const displayProjects = projects.map((project, index) => {
    return (
      <ProjectCard
        key={'ProjectCard' + index}
        palettes={palettes[project.id]}
      />
    )
  })

  return (
    <div className='ProjectContainer'>
      <div>
        <IoIosAddCircleOutline className='add-project-icon' />
      </div>
      {displayProjects}
    </div >
  )
}

export default ProjectContainer;

ProjectContainer.propTypes = {

}
