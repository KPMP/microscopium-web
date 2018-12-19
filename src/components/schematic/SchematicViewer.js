import React, { Component } from 'react';
import schematic from '../../data/schematic';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class SchematicViewer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Schematic Viewer Page</h1>
                <Col>
                    { Object.values(schematic.schematic).map((structure, i) => {

                        return <ListGroup>
                            {structure.map((cellName, j) => {
                                let href="/data/" + encodeURIComponent(cellName);
                                return <ListGroupItem>
                                           <Link to={href}>{cellName}</Link>
                                       </ListGroupItem>
                            })}
                        </ListGroup>
                    })}
                </Col>
            </div>
        );
    }
}

export default SchematicViewer;