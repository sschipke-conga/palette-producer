import './ProjectCard.scss';
import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {removeProject} from '../../actions'
import {deleteProject} from '../../util/apiCalls'
import ProjectContainer from '../ProjectContainer/ProjectContainer';

export const ProjectCard = ({ project, select, palettes, removeProject }) => {
  let displayPalettes = 'Add some palettes'
  if (palettes.length) {

    displayPalettes = palettes.map((palette, index) => {
      return (
        <PaletteCard
          key={'PaletteCard' + index}
          project={project}
          select={select}
          palette={palette}
          palettesLeft={palettes.length}
        />
      )
    })
  }

  return (
    <div className='ProjectCard' id={project.id} name={project.name}>
      <h3 className="projectCard-header-name">{project.name}</h3>
      <button className='add-palette-container' onClick={() => select(project, { name: '' })}>
        Create a new palette
      </button>
      {displayPalettes}
      <button className='delete-project'
        id={project.id}
        onClick={() => {
          deleteProject(project.id)
          removeProject(project.id)
          }
        }>
          Delete this project 
      </button>
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
  allProjects: state.allProjects,
  allPalettes: state.allPalettes
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);

ProjectCard.propTypes = {

}
