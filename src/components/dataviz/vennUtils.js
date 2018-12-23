import { VennDiagram }  from 'venn.js';
import * as d3 from 'd3';

function createChart(parameters) {
    return VennDiagram()
        .styled(false)
        .width(parameters.width || 600)
        .height(parameters.height || 500);
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