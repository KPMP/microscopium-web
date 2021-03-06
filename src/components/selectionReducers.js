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
            return action.payload.slice();
        default:
            return state;
    }
};

export const allSites = (state = []) => {
    return state;
};

export const allSitePrettyNames = (state = []) => {
    return state;
};

export const fixedSizeVenn = (state = []) => {
    return state;
};