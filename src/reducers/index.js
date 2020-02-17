import { combineReducers } from 'redux';
import user from './user'
import currentPalette from './currentPalette'

const rootReducer = combineReducers({
  user,
  currentPalette
});

export default rootReducer;