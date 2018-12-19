import actionNames from '../actions/actionNames';

export const selectedCell = (state = {}, action) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_CELL:
            return {
                ...state,
                selectedCell: action.payload
            };
        default:
            return state;
    }
};

export const selectedSites = (state = [], action) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_SITES:
            return action.payload.slice();
        default:
            return state;
    }
};

export const allSites = (state = [], action) => {
    return state;
};