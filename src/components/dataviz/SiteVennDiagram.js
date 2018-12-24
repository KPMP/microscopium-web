import React, { Component } from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import { createChart, renderChart } from './vennUtils';

const VENN_PARAMETERS = {
    width: 330
    , height: 400
};

class SiteVennDiagram extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chart: null
        };

        this.getSelectedVennSets = this.getSelectedVennSets.bind(this);
        this.handleChartUpdate = this.handleChartUpdate.bind(this);
    }

    getSelectedVennSets() {
        // _.difference(subset, superset).length === 0
        // ^^^ That will evaluate to true if subset is truly subset

        let selectedVennSets = [];
        this.props.sets.map((vennSet) => {
            if(difference(vennSet.sets, this.props.sites).length === 0) {
                selectedVennSets.push(vennSet);

                //Add a label equal to the set size
                if(!vennSet.parsed) {
                    vennSet.label = parseInt(vennSet.size).toString();
                    vennSet.parsed = true;
                }

                //If we are fixing the size of the venn, assign that value to this set
                if(this.props.fixedSizeVenn > 0) {
                    vennSet.size = this.props.fixedSizeVenn * (this.props.allSites.length / vennSet.sets.length);
                }
            }

        });

        return selectedVennSets;
    }

    handleChartUpdate() {
        let chart = this.state.chart;
        let sets = this.getSelectedVennSets();

        if(chart == null) {
            chart = createChart(VENN_PARAMETERS);
            this.setState({ chart: chart });
        }

        renderChart(chart, sets, "#venn");
    }

    componentDidMount() {
        this.handleChartUpdate();
    }

    componentDidUpdate() {
        this.handleChartUpdate();
    }

    render() {
        return (
            <div id={"venn"}>
            </div>
        );
    }

}

SiteVennDiagram.propTypes = {
    sets: PropTypes.arrayOf(PropTypes.array),
    sites: PropTypes.arrayOf(PropTypes.string),
    allSites: PropTypes.arrayOf(PropTypes.string),
    fixedSizeVenn: PropTypes.number
};

export default SiteVennDiagram;