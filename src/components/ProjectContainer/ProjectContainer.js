import './ProjectContainer.scss';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import {toggleMenu} from '../../actions/index'
import PropTypes from 'prop-types';

export const ProjectContainer = ({ allPalettes, allProjects, toggleMenu }) => {
  let displayProjects = null;
  if (allProjects.length !== 0 && allPalettes.length !== 0) {
    displayProjects = allProjects.map((project, index) => {
      const palettesByProject = allPalettes.filter(palette => palette.project_id === project.id)
      return (
        <ProjectCard
          key={'ProjectCard' + index}
          project={project}
          palettes={palettesByProject}
        />
      )
    })
  }

  return (
    <div className="ProjectContainer modal-div">
      {!allProjects.length && (
        <>
          <h4 className="no-projects">
            Get started by creating a palette and adding it to a project!
          </h4>
          <p className="explanation">
            Once you've made a palette, click the edit button to change its colors.
          </p>
          <button className="no-project-button"
          onClick={() => {toggleMenu()}}
          >Get started!</button>
        </>
      )}
      {displayProjects}
    </div>
  );
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu
    },
    dispatch
  );

export const mapStateToProps = state => ({
  allProjects: state.allProjects,
  allPalettes: state.allPalettes
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);

ProjectContainer.propTypes = {
  allPalettes: PropTypes.array,
  allProjects: PropTypes.array
}
