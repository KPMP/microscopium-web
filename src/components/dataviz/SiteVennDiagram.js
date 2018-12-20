import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { VennDiagram }  from 'venn.js';
import * as d3 from 'd3';

class SiteVennDiagram extends Component {

    constructor(props) {
        super(props);

        console.log('+++ SiteVennDiagram constructed');

        this.state = {
            chart: null
        };

        this.getSelectedSets = this.getSelectedSets.bind(this);
        this.propsAreDifferent = this.propsAreDifferent.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    getSelectedSets() {
        //TODO get the difference between all sets and selected sets
        //TODO look for deselected entries in sets and omit them from the venn
        //TODO generate filtered sets for venn

        console.log('!!! Skipping selected site filtering for now');
        return this.props.sets;
    }

    renderChart() {
        let chart = this.state.chart;
        let sets = this.getSelectedSets();

        if(chart == null) {
            console.log('+++ Instancing chart');
            chart = VennDiagram();
            this.setState({ chart: chart });
        }

        console.log('+++ Applying d3', sets);

        d3
            .select('#venn')
            .datum(sets)
            .call(chart);
    }

    propsAreDifferent(otherProps) {
        return !(isEqual(otherProps.selectedSets, this.props.selectedSets) &&
            isEqual(otherProps.selectedSites, this.props.selectedSites));
    }

    shouldComponentUpdate(nextProps, nextState) {
        let output = this.propsAreDifferent(nextProps);
        console.log('+++ vennDiagram should update', output);
        return output;
    }

    componentDidMount() {
        this.renderChart();
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