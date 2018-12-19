import actionNames from '../actions/actionNames';

export const selectedCell = (state = {}, action) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_CELL:
            return action.payload;
        default:
            return state;
    }
};

export const selectedSites = (state = [], action) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_SITES:
            return action.payload;
        default:
            return state;
    }
};