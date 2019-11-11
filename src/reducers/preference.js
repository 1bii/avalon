import actions from '../actions/preference';

const initialState = {
    theme: 'Default',
    lakeGoddess: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.initialWithData:
            return action.data;
        case actions.reset:
            return initialState;
        case actions.set: {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        default:
            return state;
    }
}

export default reducer;