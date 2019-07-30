import { pageMap } from '../service/page-service';

const initialState = {
    current: pageMap.playerSetup
    // current: pageMap.characters
    // current: pageMap.assignCharacters
    // current: pageMap.mission
    // current: pageMap.goodGame
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE':
            if (action.page in pageMap) {
                return {
                    ...state,
                    current: pageMap[action.page]
                };
            } else return state;
        default:
            return state; 
    }
}

export default reducer;