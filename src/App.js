import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import SchematicViewerContainer from './components/schematic/SchematicViewerContainer';
import DataVizViewerContainer from './components/dataviz/DataVizViewerContainer';
import initialState from './initialState';
import rootReducer from './reducers';

/* INITIALIZE REDUX **************************************************************/
const cacheStore = window.sessionStorage.getItem('redux-store');
const loadedState = cacheStore ?
    JSON.parse(cacheStore) :
    initialState;

const store = applyMiddleware(thunk)(createStore)(
    rootReducer,
    loadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const saveState = () => {
    window.sessionStorage.setItem('redux-store', JSON.stringify(store.getState()));
};

store.subscribe(saveState);

/* APP COMPONENT *****************************************************************/
class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Container fluid>
              <HashRouter>
                <Switch>
                  <Route exact path="/" component={SchematicViewerContainer} />
                  <Route path="/data/:cellName" component={DataVizViewerContainer} />
                </Switch>
              </HashRouter>
            </Container>
        </Provider>
    );
  }
}

export default App;
