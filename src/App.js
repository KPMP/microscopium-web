import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { HashRouter, Switch, Route } from 'react-router-dom';

import SchematicViewer from './components/schematic/SchematicViewer';
import DataVizViewer from './components/dataviz/DataVizViewer';

class App extends Component {
  render() {
    return (
        <Container fluid>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={SchematicViewer} />
              <Route path="/data" component={DataVizViewer} />
            </Switch>
          </HashRouter>
        </Container>
    );
  }
}

export default App;
