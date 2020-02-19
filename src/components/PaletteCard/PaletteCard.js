import './PaletteCard.scss';
import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IoIosCloseCircleOutline, IoMdTrash, IoIosCreate   } from 'react-icons/io';
import {
  setCurrentPalette,
  removePalette,
  toggleMenu,
  selectPaletteInfo,
  selectProjectInfo
} from "../../actions";
import {deletePalette} from '../../util/apiCalls'
import PropTypes from 'prop-types';

export const PaletteCard = ({ palettesLeft, project, palette, removePalette, setCurrentPalette, selectPaletteInfo, selectProjectInfo, toggleMenu }) => {

  const colors = [palette.color1, palette.color2, palette.color3, palette.color4, palette.color5];
  let paletteToDisplay = [
    { hexCode: colors[0], isLocked: true },
    { hexCode: colors[1], isLocked: true },
    { hexCode: colors[2], isLocked: true },
    { hexCode: colors[3], isLocked: true },
    { hexCode: colors[4], isLocked: true }
  ];

  const displayColors = colors.map((color, index) => {
    const colorStyles = {
      background: color,
    }
    return (
      <div key={index} className='colorblocks' style={colorStyles}>
      </div>
    )
  })

  return (
    <div className="PaletteCard-div">
      <h4 className="paletteCard-header">{palette.name}</h4>
      <div
        className="PaletteCard"
        id={palette.id}
        name={palette.name}
      >
        {displayColors}
      </div>
      <div className="palette-buttons-div">
          <button className='palette-button'
            disabled={palettesLeft > 1 ? false : true }
            id={project.id}
            onClick={async () => {
              await deletePalette(palette.id)
              removePalette(palette.id)
            }
          }>
          <IoMdTrash disabled={palettesLeft > 1 ? false : true} className="delete-icon"/>
          </button>
        <button className='palette-button'
        onClick={() => {
          setCurrentPalette(paletteToDisplay)
          selectPaletteInfo({ name: palette.name, project_id: project.id })
          selectProjectInfo({ name: project.name, id: project.id })
          toggleMenu()
          }
        }
          >
          <IoIosCreate className="edit-icon" />
        </button>
      </div>
    </div>
  );
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPalette,
      selectPaletteInfo,
      selectProjectInfo,
      removePalette,
      toggleMenu
    },
    dispatch
  );

export const mapStateToProps = state => ({
  allPalettes: state.allPalettes,
  allProjects: state.allProjects,
  currentPalette: state.currentPalette,
  selectedPaletteInfo: state.selectedPaletteInfo,
  selectedProjectInfo: state.selectedProjectInfo,
  user: state.user,
  isMenuActive: state.isMenuActive
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteCard);


PaletteCard.propTypes = {

}
