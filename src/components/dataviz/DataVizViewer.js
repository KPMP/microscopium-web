import React, { Component } from 'react';
import { Container, Col, Row, ButtonGroup, Button } from 'reactstrap';
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
            <Container>
                <Row>
                    <Col>
                        <h1>Data Viz Viewer Page</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Selected cell type: {this.props.selectedCell}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup>
                            { this.props.allSites.map((siteName) => {
                                return <Button
                                        color="primary"
                                        onClick={() => {this.onSiteClick(siteName)}}
                                        active={this.props.selectedSites.indexOf(siteName) > -1}>
                                        {siteName}
                                    </Button>;
                            })}
                        </ButtonGroup>
                    </Col>
                    <Col>
                        <GeneDataTable rows={this.getTableRows()}/>
                    </Col>
                    <Col>
                        <SiteVennDiagram sets={this.getVennSets()} sites={this.props.selectedSites}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DataVizViewer;