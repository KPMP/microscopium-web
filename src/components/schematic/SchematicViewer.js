import React, { Component } from 'react';
import schematic from '../../data/schematic';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class SchematicViewer extends Component {

    constructor(props) {
        super(props);

        this.onCellClick = this.onCellClick.bind(this);
    }

    onCellClick(cellName) {
        this.props.setSelectedCell(cellName);
    }

    render() {
        return (
            <div>
                <h1>Schematic Viewer Page</h1>
                <Col>
                    { schematic.root.map((structure) => {
                        let structureName = structure.structure;
                        return <Row>
                                <h2>{structureName}</h2>
                                <ListGroup>
                                    {structure.cells.map((cellName) => {
                                        let href="/data/" + encodeURIComponent(cellName);
                                        return <ListGroupItem>
                                                   <Link to={href}
                                                   onClick={() => { this.onCellClick(cellName)}}
                                                   >{cellName}</Link>
                                               </ListGroupItem>
                                    })}
                                </ListGroup>
                            </Row>
                    })}
                </Col>
            </div>
        );
    }
}

export default SchematicViewer;