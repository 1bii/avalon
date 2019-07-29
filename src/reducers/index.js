import { combineReducers } from 'redux';
import characters from './characters';
import players from './players';
import page from './page';
import gameStatus from './gameStatus';

export default combineReducers({
    characters,
    players,
    page,
    gameStatus
})