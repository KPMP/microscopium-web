import React, { Component } from 'react';
import schematic from '../../data/schematic';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import union from 'lodash/union';
import flattenDeep from 'lodash/flattenDeep';

class SchematicViewer extends Component {

    constructor(props) {
        super(props);

        this.onCellClick = this.onCellClick.bind(this);

        this.state = {
            images: SchematicViewer.parseImages()
        };

        console.log("+++ this.state.images", this.state.images);
    }

    onCellClick(cellName) {
        this.props.setSelectedCell(cellName);
    }

    static parseImages() {
        let schematicImages = schematic.root.map((structure) => {
            let structureImages = structure.cells.map((cell) =>
                cell.hasOwnProperty("images")
                ? cell.images
                : []);

            structureImages.push(
                structure.hasOwnProperty("images")
                    ? structure.images
                    : []);

            return structureImages;
        });

        return union(flattenDeep(schematicImages));
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