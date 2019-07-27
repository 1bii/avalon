import actions from '../actions/characters';

const initialState = {
    characterList: {
        merlin: {
            maxCount: 1,
            count: 0
        },
        percival: {
            maxCount: 1,
            count: 0
        },
        servant: {
            maxCount: 5,
            count: 0
        },
        mordred: {
            maxCount: 1,
            count: 0
        },
        morgana: {
            maxCount: 1,
            count: 0
        },
        assassin: {
            maxCount: 1,
            count: 0
        },
        oberon: {
            maxCount: 1,
            count: 0
        },
        minion: {
            maxCount: 3,
            count: 0
        }
    },
    selectedCount: 0
}

// action = {
//     type,
//     characterName
// }
const reducer = (state = initialState, action) => {
    if (action.type === actions.reset) return {...initialState};
    if (!(action.characterName in state.characterList)) return state;
    let currentCount = state.characterList[action.characterName].count;
    let maxCount = state.characterList[action.characterName].maxCount;
    switch (action.type) {
        case actions.increment:
            return {
                ...state,
                characterList: {
                    ...state.characterList,
                    [action.characterName]: {
                        ...state.characterList[action.characterName],
                        count: maxCount > currentCount ? currentCount + 1 : currentCount
                    }
                },
                selectedCount: maxCount > currentCount ? state.selectedCount + 1 : state.selectedCount
            }
        case actions.decrement:
            return {
                ...state,
                characterList: {
                    ...state.characterList,
                    [action.characterName]: {
                        ...state.characterList[action.characterName],
                        count: currentCount > 0 ? currentCount - 1 : currentCount
                    }
                },
                selectedCount: currentCount > 0 ? state.selectedCount - 1 : state.selectedCount
            }
        default:
            return state; 
    }
}

export default reducer;