import './ProjectContainer.scss';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

export const ProjectContainer = ({ allPalettes, allProjects }) => {
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
            Get started by adding a palette to your first project!
          </h4>
          <p className="explanation">
            Once you've made a palette, double click it to select it.
          </p>
        </>
      )}
      {displayProjects}
    </div>
  );
}

export const mapStateToProps = state => ({
  allProjects: state.allProjects,
  allPalettes: state.allPalettes
});

export default connect(mapStateToProps)(ProjectContainer);

ProjectContainer.propTypes = {
  allPalettes: PropTypes.array,
  allProjects: PropTypes.array
}
