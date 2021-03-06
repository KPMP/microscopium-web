import { combineReducers } from 'redux';
import loadedState from './initialState';
import actionNames from './actions/actionNames';
import { selectedCell, selectedSites, allSites, allSitePrettyNames, fixedSizeVenn } from './components/selectionReducers';

const appReducer = combineReducers({
    selectedCell,
    selectedSites,
    allSites,
    allSitePrettyNames,
    fixedSizeVenn
});

const rootReducer = (state, action) => {
    if(action.type === actionNames.RESET_STATE) {
        state = loadedState;
    }

    return appReducer(state, action);
};

export default rootReducer;