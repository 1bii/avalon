import actions from '../actions/gameStatus';

const initialState = {
    round: 0, // 0~4
    rejects: 0,
    successCount: 0,
    leaderIndex: 0, // index in playerList
    lakeGoddess: [],
    selectedTeam: new Set([]),
    gameEnd: false
}

const reducer = (state = initialState, action) => {
    let newSet;
    switch (action.type) {
        case actions.stepToNextRound:
            return {
                ...state,
                rejects: 0,
                round: state.round >= 5 ? state.round : state.round + 1,
                selectedTeam: new Set([])
            }
        case actions.addSuccess:
            return {
                ...state,
                successCount: state.successCount + 1
            }
        case actions.setLeader:
            return {
                ...state,
                leaderIndex: action.index
            }
        case actions.addLakeGoddess:
            return {
                ...state,
                lakeGoddess: [...state.lakeGoddess, action.index]
            }
        case actions.selectPlayer:
            newSet = new Set(state.selectedTeam);
            if (newSet.has(action.name)) newSet.delete(action.name);
            else newSet.add(action.name);
            return {
                ...state,
                selectedTeam: newSet
            }
        case actions.clearPlayer:
            return {
                ...state,
                selectedTeam: new Set([])
            }
        case actions.endGame:
            return {
                ...state,
                gameEnd: true
            }
        case actions.addRejects:
            return {
                ...state,
                rejects: state.rejects + 1
            }
        case actions.reset:
            return { ...initialState }
        default:
            return state;
    }
}

export default reducer;