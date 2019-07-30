import actions from '../actions/players';
import { shuffle } from '../service/utils';

const initialState = {
    playerList: []
    // playerList: [
    //     {name: 'Alice', role: null},
    //     {name: 'Bob', role: null},
    //     {name: 'Cathy', role: null},
    //     {name: 'Dickson', role: null},
    //     {name: 'Evelyn', role: null},
    // ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.add:
            return {
                ...state,
                playerList: [...state.playerList, {name: action.player, good: null}]
            };
        case actions.delete:
            return {
                ...state,
                playerList: state.playerList.slice(action.index, 1)
            };
        case actions.clear:
            return {
                ...state,
                playerList: []
            };
        case actions.setRole:
            return {
                ...state,
                playerList: state.playerList.map((player, i) => ({
                    ...player,
                    role: action.assignableList[i]
                }))
            }
        case actions.shuffle:
            return {
                ...state,
                playerList: shuffle(state.playerList)
            }
        default:
            return state; 
    }
}

export default reducer;