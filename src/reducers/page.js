import { pageMap } from '../service/page-service';

const initialState = {
    current: pageMap.playerSetup
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