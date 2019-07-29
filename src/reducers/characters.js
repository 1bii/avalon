import actions from '../actions/characters';
import { shuffle } from '../service/utils';

const initialState = {
    characterList: {
        merlin: {
            maxCount: 1,
            count: 1,
            order: 0
        },
        percival: {
            maxCount: 1,
            count: 1,
            order: 1
        },
        servant: {
            maxCount: 5,
            count: 1,
            order: 2
        },
        mordred: {
            maxCount: 1,
            count: 1,
            order: 3
        },
        morgana: {
            maxCount: 1,
            count: 1,
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
    selectedCount: 5,
    assignableList: []
}

// action = {
//     type,
//     characterName
// }
const reducer = (state = initialState, action) => {
    let currentCount = 0;
    let maxCount = 0;
    switch (action.type) {
        case actions.increment:
            currentCount = state.characterList[action.characterName].count;
            maxCount = state.characterList[action.characterName].maxCount;
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
            currentCount = state.characterList[action.characterName].count;
            maxCount = state.characterList[action.characterName].maxCount;
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
        case actions.shuffle: // generate a shuffled list of characters to assign, and this list will be fixed during the game
            let newList = [];
            Object.keys(state.characterList).forEach(name => {
                if (state.characterList[name].count) {
                    Array(state.characterList[name].count).fill().forEach(() =>{
                        newList.push(name)
                    });
                }
            });
            return {
                ...state,
                assignableList: shuffle(newList)
            }
        case actions.reset:
            return { ...initialState };    
        default:
            return state; 
    }
}

export default reducer;