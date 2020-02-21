import './ProjectCard.scss';
import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {removeProject} from '../../actions'
import {deleteProject} from '../../util/apiCalls'

export const ProjectCard = ({ project, palettes, removeProject }) => {
  let displayPalettes = 'Add some palettes'
  if (palettes.length) {
    displayPalettes = palettes.map((palette, index) => {
      return (
        <PaletteCard
          key={'PaletteCard' + index}
          project={project}
          palette={palette}
          palettesLeft={palettes.length}
        />
      )
    })
  }

  return (
    <div className='ProjectCard' id={project.id} name={project.name}>
      <div className="project-div">
        <h3 className="projectCard-header-name">{project.name}</h3>
        <button className='delete-project'
          id={project.id}
          onClick={async () => {
            await deleteProject(project.id)
            removeProject(project.id)
          }
        }>
          Delete this project 
        </button>
      </div>
      {displayPalettes}
    </div >
  )
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeProject
    },
    dispatch
  );

export const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);

ProjectCard.propTypes = {
  project: PropTypes.object,
  palettes: PropTypes.array,
  removeProject: PropTypes.func.isRequired
}
