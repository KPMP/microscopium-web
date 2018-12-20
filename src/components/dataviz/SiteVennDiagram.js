import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';
import { createChart, renderChart } from './vennUtils';

class SiteVennDiagram extends Component {

    constructor(props) {
        super(props);

        console.log('+++ SiteVennDiagram constructed');

        this.state = {
            chart: null
        };

        this.getSelectedSets = this.getSelectedSets.bind(this);
        this.propsAreDifferent = this.propsAreDifferent.bind(this);
        this.handleChartUpdate = this.handleChartUpdate.bind(this);
    }

    getSelectedSets() {
        //TODO get the difference between all sets and selected sets
        //TODO look for deselected entries in sets and omit them from the venn
        //TODO generate filtered sets for venn

        console.log('!!! Skipping selected site filtering for now');
        return this.props.sets;
    }

    handleChartUpdate() {
        let chart = this.state.chart;
        let sets = this.getSelectedSets();

        if(chart == null) {
            chart = createChart();
            this.setState({ chart: chart });
        }

        renderChart(chart, sets, "#venn");
    }

    propsAreDifferent(otherProps) {
        return !(isEqual(otherProps.selectedSets, this.props.selectedSets) &&
            isEqual(otherProps.selectedSites, this.props.selectedSites));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.propsAreDifferent(nextProps);;
    }

    componentDidMount() {
        this.handleChartUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
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
    sites: PropTypes.arrayOf(PropTypes.string)
};

export default SiteVennDiagram;