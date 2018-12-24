import React, { Component } from 'react';
import schematic from '../../data/schematic';
import { Col, Container, Row } from 'reactstrap';
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
            <Container id="schematic-viewer">
                <Row>
                    <Col sm>
                    <h1>Select a Cell Type</h1>
                        { schematic.root.map((structure) => {
                            //TODO add structure hover logic

                            return <ul className="cell-structure-list">
                                <li>
                                    { !structure.hasOwnProperty("cellName") ? (
                                    <span className="cell-structure-name">{structure.structureName}</span>
                                    ) : (
                                    <Link to={`/data/${encodeURIComponent(structure.cellName)}`}
                                          onClick={() => { this.onCellClick(structure.cellName)}}
                                        >{structure.structureName}</Link>
                                    ) }
                                    <ul className="cell-type-list">
                                        {structure.cells.map((cell) => {
                                            return <li>
                                                    <Link to={`/data/${encodeURIComponent(cell.cellName)}`}
                                                       onClick={() => { this.onCellClick(cell.cellName)}}
                                                       >{cell.cellName}</Link>
                                                </li>
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SchematicViewer;