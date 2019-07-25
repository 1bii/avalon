const initialState = {
    playerList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return {
                ...state,
                playerList: [...state.playerList, action.player]
            };
        case 'DELETE_PLAYER':
            return {
                ...state,
                playerList: state.playerList.slice(action.index, 1)
            };
        default:
            return state; 
    }
}

export default reducer;