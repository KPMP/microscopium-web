import { combineReducers } from 'redux';
// import loadedState from './initialState';
// import actionNames from './actions/actionNames';

const appReducer = combineReducers({

});

const rootReducer = (state, action) => {
    // if(action.type === actionNames.RESET_STATE) {
    //     state = loadedState;
    // }

    return appReducer(state, action);
};

export default rootReducer;