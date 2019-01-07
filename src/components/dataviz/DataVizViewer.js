import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Container, Col, Row, ButtonGroup, Button, Input } from 'reactstrap';
import GeneDataTable from "./GeneDataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SiteVennDiagram from './SiteVennDiagram';

import atlas from '../../data/atlas';

class DataVizViewer extends Component {

    constructor(props) {
        super(props);
        this.onSiteClick = this.onSiteClick.bind(this);
        this.getTableRows = this.getTableRows.bind(this);
        this.getVennSets = this.getVennSets.bind(this);
    }

    getTableRows() {
        return Object.values(atlas.result.cells[this.props.selectedCell].rows);
    }

    getVennSets() {
        return atlas.result.cells[this.props.selectedCell].sets;
    }

    componentDidMount() {
        let urlCell = decodeURIComponent(this.props.match.params.cellName);

        //If we detect the URL has a different selected cell state than redux, set redux to match URL
        if(this.props.selectedCell !== urlCell) {
            this.props.setSelectedCell(urlCell);
        }
    }

    onSiteClick(siteName) {
        let sites = this.props.selectedSites
            , siteIsSelected = sites.indexOf(siteName);

        if(siteIsSelected > -1 && sites.length > 1) {
            sites.splice(siteIsSelected, 1);
        }

        else {
            sites.push(siteName);
        }

        this.props.setSelectedSites(sites);
    }

    render() {
        return (
            <Container id="data-viewer">
                <Row className="page-header">
                    <Col className="mr-auto my-auto">
                        <h5>{this.props.selectedCell} gene expression</h5>
                    </Col>
                    <Col className="col-auto">
                        <ButtonGroup>
                            <Button color="primary" active>Transcriptomics</Button>
                            <Button color="primary" disabled outline>Proteomics</Button>
                            <Button color="primary" disabled outline>Metabolomics</Button>
                            <Button color="primary" disabled outline>Integrated</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className="page-instructions">
                    <p><em>Left</em>: The Venn diagram shows how many genes were found to be expressed by this cell type ({this.props.selectedCell}) at each Tissue Interrogation Site (TIS).</p>
                    <br/><p><em>Right</em>: The data table shows every expressed gene as measured by each TIS.  When a gene was not measured or found significant by a TIS, its values will show as "-" in the table.</p>
                </Row>
                <Row className="page-charts">
                    <Col sm={4} id="venn-diagram">
                        <Row className="column-header venn-header align-middle">
                            <Button outline tag="a" className="instruction">
                                <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    size="sm"/>
                            </Button>
                            &nbsp;
                            <h6>Differentially expressed genes</h6>
                        </Row>
                        <Row>
                        <SiteVennDiagram
                            sets={this.getVennSets()}
                            sites={this.props.selectedSites}
                            allSites={this.props.allSites}
                            fixedSizeVenn={this.props.fixedSizeVenn}
                        />
                        </Row>
                        <Row className="site-selector-group no-gutters">
                            { this.props.allSites.map((siteName) => {
                                return (
                                    <Row className="no-gutters w-100">
                                    <Button
                                        className={`site-selector-label ${siteName}`}
                                        active={this.props.selectedSites.indexOf(siteName) > -1}
                                        outline
                                        onClick={() => {this.onSiteClick(siteName)}} >
                                        {this.props.allSitePrettyNames[siteName]}
                                        </Button>



                                    </Row>);
                            })}
                        </Row>
                        <Row className="bottom-spacer"></Row>
                    </Col>
                    <GeneDataTable
                        selectedCellName={this.props.selectedCell}
                        rows={this.getTableRows()}
                        allSites={this.props.allSites}
                        allSitesPrettyNames={this.props.allSitePrettyNames}
                    />
                </Row>
            </Container>
        );
    }
}

export default DataVizViewer;