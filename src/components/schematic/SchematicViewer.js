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
                <h1>Select a Cell Type</h1>
                <Col>
                    { schematic.root.map((structure) => {
                        let structureName = structure.structure;
                        return <ul className="cell-structure-list">
                            <li>
                                <span className="cell-structure-name">{structureName}</span>
                                <ul className="cell-type-list">
                                    {structure.cells.map((cellName) => {
                                        return <li>
                                                <Link to={`/data/${encodeURIComponent(cellName)}`}
                                                   onClick={() => { this.onCellClick(cellName)}}
                                                   >{cellName}</Link>
                                            </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                    })}
                </Col>
            </div>
        );
    }
}

export default SchematicViewer;