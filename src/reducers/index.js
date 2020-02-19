import { combineReducers } from 'redux';
import user from './user'
import currentPalette from './currentPalette'
import selectedPaletteInfo from './selectedPaletteInfo'
import selectedProjectInfo from './selectedProjectInfo' 
import allPalettes from './allPalettes'
import allProjects from './allProjects'
import isMenuActive from './menuActive'

const rootReducer = combineReducers({
  allPalettes,
  allProjects,
  currentPalette,
  selectedPaletteInfo,
  selectedProjectInfo,
  isMenuActive,
  user
});

export default rootReducer;