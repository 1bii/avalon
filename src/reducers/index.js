import { combineReducers } from 'redux';
import characters from './characters';
import players from './players';

export default combineReducers({
    characters,
    players
})