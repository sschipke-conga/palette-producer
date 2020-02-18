import { combineReducers } from 'redux';
import user from './user'
import currentPalette from './currentPalette'
import allPalettes from './allPalettes'
import isMenuActive from './menuActive'

const rootReducer = combineReducers({
  allPalettes,
  currentPalette,
  isMenuActive,
  user
});

export default rootReducer;