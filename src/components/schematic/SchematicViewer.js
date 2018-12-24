import React, { Component } from 'react';
import schematic from '../../data/schematic';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import union from 'lodash/union';
import flattenDeep from 'lodash/flattenDeep';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const IMG_SRC_PREFIX = '/atlas/img/schematic/';

class SchematicViewer extends Component {

    constructor(props) {
        super(props);

        this.onCellClick = this.onCellClick.bind(this);

        this.state = {
            images: SchematicViewer.parseImages()
        };
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

    componentDidMount() {

        console.log('+++ SchematicViewer.componentDidMount()');

        this.state.images.map((image) => {
            let img = document.createElement('img')
                , src = IMG_SRC_PREFIX + image + '.png';
            console.log('+++ downloading image', src);
            img.setAttribute('src', src);
        });
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
                    <Col sm>
                        <div id="schematic-images">
                            <TransitionGroup>
                            </TransitionGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SchematicViewer;