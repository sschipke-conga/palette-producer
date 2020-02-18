import './ProjectCard.scss';
import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProjectContainer from '../ProjectContainer/ProjectContainer';

export const ProjectCard = ({ project, select, removePalette, palettes, removeProject }) => {
  let displayPalettes = 'Add some palettes'
  if (palettes.length) {

    displayPalettes = palettes.map((palette, index) => {
      return (
        <PaletteCard
          key={'PaletteCard' + index}
          project={project}
          select={select}
          palette={palette}
        />
      )
    })
  }

  return (
    <div className='ProjectCard' id={project.d} name={project.name}>
      <h3 className="projectCard-header-name">{project.name}</h3>
      <button className='add-palette-container' onClick={() => select(project, { name: '' })}>
        Create a new palette
      </button>
      {displayPalettes}
      <button className='delete-project'
        id={project.id}
        onClick={removeProject}>
          Delete this project 
      </button>
    </div >
  )
}

// export const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       setUser
//     },
//     dispatch
//   );

export const mapStateToProps = state => ({
  user: state.user,
  allProjects: state.allProjects,
  allPalettes: state.allPalettes
});

export default connect(mapStateToProps)(ProjectCard);

ProjectCard.propTypes = {

}
