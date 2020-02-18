import './ProjectContainer.scss';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const ProjectContainer = ({ select, removePalette, removeProject, allPalettes, allProjects }) => {
  let displayProjects = null;
  if (allProjects.length !== 0 && allPalettes.length !== 0) {
    displayProjects = allProjects.map((project, index) => {
      // let palettesForProject = allPalettes.filter(
      //   palette => {
      //     console.log(project.id, palette.project_id)
      //     return palette.project_id === project.id
      //   }
      //   );
        // console.log(palettesForProject)
      return (
        <ProjectCard
          key={'ProjectCard' + index}
          project={project}
          palettes={allPalettes[index]}
          select={select}
          removePalette={removePalette}
          removeProject={removeProject}
        />
      )
    })
  }

  return (
    <div className='ProjectContainer'>
      {allProjects.length === 0 && (<>
      <h4 className='no-projects'>Get started by adding a palette to your first project!</h4>
      <p className='explanation'>Once you've made a palette, double click it to select it.</p>
      </>)}
      {allProjects.length !== 0 && <button className='add-project-container' onClick={() => select({name: ''}, {name: ''})}>
        Create a new project
      </button>}
      {displayProjects}
    </div >
  )
}

export const mapStateToProps = state => ({
  user: state.user,
  allProjects: state.allProjects,
  allPalettes: state.allPalettes
});

export default connect(mapStateToProps)(ProjectContainer);

ProjectContainer.propTypes = {

}
