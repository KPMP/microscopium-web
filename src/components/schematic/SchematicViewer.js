import React, { Component } from 'react';
import schematic from '../../data/schematic';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import union from 'lodash/union';
import flattenDeep from 'lodash/flattenDeep';
import ReactGA from 'react-ga';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

const IMG_SRC_PREFIX = '/atlas/img/schematic/';

class SchematicViewer extends Component {

    constructor(props) {
        super(props);

        this.onCellClick = this.onCellClick.bind(this);

        this.state = {
            images: SchematicViewer.parseImages()
            , activeImages: []
        };
    }

    onCellClick(cellName) {
        ReactGA.event({
            category: 'Schematic',
            action: 'Select Cell Type',
            label: cellName
        });
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
        //Preload static image assets for the schematic nephron
        this.state.images.map((image) => {
            let img = document.createElement('img')
                , src = IMG_SRC_PREFIX + image + '.png';
            img.setAttribute('src', src);
        });
    }

    render() {
        return (
            <Container id="schematic-viewer">
                <Row className="page-header align-middle">
                    <Col className="mr-auto my-auto">
                        <h5>Select a cell type</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm className="left-border-column">
                        { schematic.root.map((structure) =>
                            <ul className="cell-structure-list">
                                <li>
                                    { !structure.hasOwnProperty("cellName") ? (
                                    <span className="cell-structure-name">{structure.structureName}</span>
                                    ) : (
                                    <Link className="cell-structure-name"
                                          to={`/data/${encodeURIComponent(structure.cellName)}`}
                                          onClick={() => { this.onCellClick(structure.cellName)}}
                                          onMouseEnter={() => this.setState({ activeImages: structure.images })}
                                        >{structure.structureName}
                                        </Link>
                                    ) }
                                    <ul className="cell-type-list">
                                        {structure.cells.map((cell) => {
                                            return <li>
                                                    <Link to={`/data/${encodeURIComponent(cell.cellName)}`}
                                                          onClick={() => { this.onCellClick(cell.cellName)}}
                                                          onMouseEnter={() => this.setState( { activeImages: cell.images })}
                                                        >{cell.cellName}
                                                        </Link>
                                                </li>
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        )}
                    </Col>
                    <Col sm className="right-border-column">
                            <div id="schematic-images">
                                { this.state.activeImages.map((image) =>
                                    <div className={image} />
                                )}
                            </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SchematicViewer;