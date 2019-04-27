import React, { Component } from 'react';
import { Container, Col, Row, ButtonGroup, Button } from 'reactstrap';
import GeneDataTable from "./GeneDataTable";
import SiteVennDiagram from './SiteVennDiagram';
import Instruction from './Instruction';
import each from 'lodash/each';
import values from 'lodash/values';
import ReactGA from 'react-ga';

import atlas from '../../data/atlas';

class DataVizViewer extends Component {

    constructor(props) {
        super(props);
        this.getDataTableDefaultSortOrder = this.getDataTableDefaultSortOrder.bind(this);
        this.onVennClick = this.onVennClick.bind(this);
        this.onSiteClick = this.onSiteClick.bind(this);

        this.state = {
            vennFilter: [],
            tableRows: values(atlas.result.cells[this.props.selectedCell].rows),
            vennSets: atlas.result.cells[this.props.selectedCell].sets,
            defaultSortOrder: this.getDataTableDefaultSortOrder()
        };
    }

    componentDidMount() {
        let cellFromUrl = decodeURIComponent(this.props.match.params.cellName);

        //If we detect the URL has a different selected cell state than redux, set redux to match URL
        if(this.props.selectedCell !== cellFromUrl) {
            this.props.setSelectedCell(cellFromUrl);
        }
    }

    getDataTableDefaultSortOrder() {
        let vennSets = atlas.result.cells[this.props.selectedCell].sets;
        let sites = { };
        let sitesArray = [ ];

        each(vennSets, function(vennSet) {
            each(vennSet.sets, function(site) {
                sites.hasOwnProperty(site) ?
                    sites[site] += parseInt(vennSet.size) :
                    sites[site] = parseInt(vennSet.size);
            });
        });

        for(let siteName in sites) {
            sitesArray.push({
                id: 'f_' + siteName + '_p_val_adj',
                size: sites[siteName],
                desc: true
            });
        }

        sitesArray.sort(function(a, b) {
            return a.size - b.size;
        });

        return sitesArray;
    }

    onVennClick(vennSet) {
        let siteNames = vennSet.sets.join(' ');
        ReactGA.event({
            category: 'Venn Diagram',
            action: 'Click Set'
        });
        this.setState({
            vennFilter: this.props.allSites.map(function (siteName) {
                return {
                    id: 'f_' + siteName + '_avgLogFc',
                    value: siteNames.indexOf(siteName) === -1 ? '-' : '+'
                };
            })
        });
    }

    onSiteClick(siteName) {
        ReactGA.event({
            category: 'Venn Diagram',
            action: 'Click Site',
            label: siteName
        });
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
                            <Button color="primary" disabled outline>Imaging</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className="page-instructions">
                    <p><em>Left</em>: The Venn diagram shows how many genes were significantly expressed for this cell type
                        ({this.props.selectedCell}) by each transcriptomics technology.</p>
                    <br/><p><em>Right</em>: The data table shows every significantly expressed gene for this cell type
                    as measured by each transcriptomics technology. When a gene was not measured or found significant
                    by a technology, its values will show as "-" in the table.</p>
                </Row>
                <Row className="page-charts">
                    <Col sm={4} id="venn-diagram">
                        <Row className="column-header venn-header align-middle">
                            <Instruction
                                id="venn-diagram-instruction"
                                title="Reading the Venn Diagram"
                                placement="bottom">
                                <ul>
                                    <li>This shows the total number of expressed genes measured by each transcriptomics technology.</li>
                                    <li>Click on a set in the diagram to filters the Data Table down to those genes.</li>
                                    <li>To hide a technology in the diagram, click its name in the legend below.  Click again to bring it back.</li>
                                </ul>
                            </Instruction>
                            &nbsp;
                            <h6>Differentially expressed genes</h6>
                        </Row>
                        <Row>
                        <SiteVennDiagram
                            sets={this.state.vennSets}
                            sites={this.props.selectedSites}
                            allSites={this.props.allSites}
                            fixedSizeVenn={this.props.fixedSizeVenn}
                            onVennClick={this.onVennClick}
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
                        <Row className="bottom-spacer" />
                    </Col>
                    <GeneDataTable
                        selectedCellName={this.props.selectedCell}
                        rows={this.state.tableRows}
                        allSites={this.props.allSites}
                        allSitesPrettyNames={this.props.allSitePrettyNames}
                        defaultSortOrder={this.state.defaultSortOrder}
                        vennFilter={this.state.vennFilter}
                    />
                </Row>
            </Container>
        );
    }
}

export default DataVizViewer;