import { VennDiagram }  from 'venn.js';
import * as d3 from 'd3';

function createChart(sets) {
    return VennDiagram().styled(false);
}

function renderChart(chart, sets, selector) {
    d3
        .select(selector)
        .datum(sets)
        .call(chart);
}

function applyToolTips() {

}

function applyMouseListeners() {

}

export { createChart, renderChart };