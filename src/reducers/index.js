import { combineReducers } from 'redux';
import user from './user'
import currentPalette from './currentPalette'
import allPalettes from './allPalettes'

const rootReducer = combineReducers({
  allPalettes,
  user,
  currentPalette
});

export default rootReducer;