import { combineReducers } from 'redux';
import componentReducer from './components';
import playerReducer from './player';

const mainReducer = combineReducers({
  player: playerReducer,
  components: componentReducer
})

export default mainReducer;