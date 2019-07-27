import actions from '../actions/players';

const initialState = {
    // playerList: []
    playerList: [
        {name: 'Alice', good: null},
        {name: 'Bob', good: null},
        {name: 'Cathy', good: null},
        {name: 'Dickson', good: null},
        {name: 'Evelyn', good: null},
    ]
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
        default:
            return state; 
    }
}

export default reducer;