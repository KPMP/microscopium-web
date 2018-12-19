import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import SchematicViewer from './components/schematic/SchematicViewer';
import DataVizViewer from './components/dataviz/DataVizViewer';
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
        <Provider>
            <Container fluid>
              <HashRouter>
                <Switch>
                  <Route exact path="/" component={SchematicViewer} />
                  <Route path="/data" component={DataVizViewer} />
                </Switch>
              </HashRouter>
            </Container>
        </Provider>
    );
  }
}

export default App;
