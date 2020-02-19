import { combineReducers } from 'redux';
import user from './user'
import currentPalette from './currentPalette'
import currentPaletteInfo from './currentPaletteInfo'
import currentProjectInfo from './currentProjectInfo' 
import allPalettes from './allPalettes'
import allProjects from './allProjects'
import isMenuActive from './menuActive'

const rootReducer = combineReducers({
  allPalettes,
  allProjects,
  currentPalette,
  currentPaletteInfo,
  currentProjectInfo,
  isMenuActive,
  user
});

export default rootReducer;