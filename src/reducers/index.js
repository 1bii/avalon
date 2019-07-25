import { combineReducers } from 'redux';
import characters from './characters';
import players from './players';
import page from './page';

export default combineReducers({
    characters,
    players,
    page
})