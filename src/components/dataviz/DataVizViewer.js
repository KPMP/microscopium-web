import React, { Component } from 'react';
import { Container, Col, Row, ButtonGroup, Button, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import GeneDataTable from "./GeneDataTable";
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

        if(siteIsSelected > -1) {
            sites.splice(siteIsSelected, 1);
        }

        else {
            sites.push(siteName);
        }

        this.props.setSelectedSites(sites);
    }

    render() {
        return (
            <Container  id="data-viewer">
                <Row>
                    <h4>{this.props.selectedCell} cell gene expression</h4>
                </Row>
                <Row>
                    <ButtonGroup>
                        <Button color="primary" active>Transcriptomics</Button>
                        <Button color="primary" disabled outline>Proteomics</Button>
                        <Button color="primary" disabled outline>Metabolomics</Button>
                        <Button color="primary" disabled outline>Integrated</Button>
                    </ButtonGroup>
                </Row>
                <Row>
                    <Col sm={4}>
                        <h6>Differentially expressed genes</h6>
                        <SiteVennDiagram
                            sets={this.getVennSets()}
                            sites={this.props.selectedSites}
                            allSites={this.props.allSites}
                            fixedSizeVenn={this.props.fixedSizeVenn}
                        />
                        <div class="site-selector-group">
                            { this.props.allSites.map((siteName) => {
                                return (
                                    <p>
                                    <Input
                                        type="checkbox"
                                        class="site-selector-input"
                                        checked={this.props.selectedSites.indexOf(siteName) > -1}
                                        onClick={() => {this.onSiteClick(siteName)}} />
                                    <span class={`site-selector-label ${siteName}`}>{this.props.allSitePrettyNames[siteName]}</span>
                                    </p>);
                            })}
                        </div>
                    </Col>
                    <Col sm={8}>
                        <GeneDataTable
                            selectedCellName={this.props.selectedCell}
                            rows={this.getTableRows()}
                            allSites={this.props.allSites}
                            allSitesPrettyNames={this.props.allSitePrettyNames}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DataVizViewer;