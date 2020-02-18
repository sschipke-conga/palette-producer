import { combineReducers } from 'redux';
import user from './user'
import currentPalette from './currentPalette'
import allPalettes from './allPalettes'
import allProjects from './allProjects'
import isMenuActive from './menuActive'

const rootReducer = combineReducers({
  allPalettes,
  allProjects,
  currentPalette,
  isMenuActive,
  user
});

export default rootReducer;