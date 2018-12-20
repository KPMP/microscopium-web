import React, { Component } from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import { createChart, renderChart } from './vennUtils';

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
            }
        });

        return selectedVennSets;
    }

    handleChartUpdate() {
        let chart = this.state.chart;
        let sets = this.getSelectedVennSets();

        if(chart == null) {
            chart = createChart();
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
    allSites: PropTypes.arrayOf(PropTypes.string)
};

export default SiteVennDiagram;