import actions from '../actions/characters';

const initialState = {
    characterList: {
        merlin: {
            maxCount: 1,
            count: 0,
            order: 0
        },
        percival: {
            maxCount: 1,
            count: 0,
            order: 1
        },
        servant: {
            maxCount: 5,
            count: 0,
            order: 2
        },
        mordred: {
            maxCount: 1,
            count: 0,
            order: 3
        },
        morgana: {
            maxCount: 1,
            count: 0,
            order: 4
        },
        assassin: {
            maxCount: 1,
            count: 0,
            order: 5
        },
        oberon: {
            maxCount: 1,
            count: 0,
            order: 6
        },
        minion: {
            maxCount: 3,
            count: 0,
            order: 7
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