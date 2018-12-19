import actionNames from './actionNames';

export const setSelectedCell = (cell) => {
    return {
        type: actionNames.SET_SELECTED_CELL,
        payload: cell
    };
}

export const setSelectedSites = (sites) => {
    return {
        type: actionNames.SET_SELECTED_SITES,
        payload: sites
    };
}