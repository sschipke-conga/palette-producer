import './PaletteCard.scss';
import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IoIosCloseCircleOutline } from 'react-icons/io';
import {setCurrentPalette} from '../../actions'
import PropTypes from 'prop-types';

export const PaletteCard = ({ select, project, palette, removePalette, setCurrentPalette }) => {

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
        onClick={() => setCurrentPalette(paletteToDisplay)}
      >
        {displayColors}
      </div>
      <IoIosCloseCircleOutline className='delete-palette'
        id={project.id}
        onClick={removePalette} />
    </div>
  );
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPalette
    },
    dispatch
  );

export const mapStateToProps = state => ({
  allPalettes: state.allPalettes,
  allProjects: state.allProjects,
  currentPalette: state.currentPalette,
  user: state.user,
  isMenuActive: state.isMenuActive
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteCard);


PaletteCard.propTypes = {

}
