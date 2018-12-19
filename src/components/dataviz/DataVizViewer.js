import React, { Component } from 'react';
import { Col, Row, ButtonGroup, Button } from 'reactstrap';
import atlas from '../../data/atlas';

class DataVizViewer extends Component {

    constructor(props) {
        super(props);

        this.onSiteClick = this.onSiteClick.bind(this);
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
            <Col>
                <Row>
                <h1>Data Viz Viewer Page</h1>
                </Row>
                <Row>
                <h2>Selected cell type: {this.props.selectedCell}</h2>
                </Row>
                <Row>
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
                </Row>
            </Col>
        );
    }
}

export default DataVizViewer;