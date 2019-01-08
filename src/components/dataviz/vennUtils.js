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

function applyChartMouseListeners(clickHandler) {
    d3.selectAll(
        '#venn .venn-area')
        .on('mouseover', null)
        .on('mouseout', null)
        .on('click', null)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
        .on('click', function(d) { clickHandler(d); });
}

function onMouseOver() {
    let node = d3.select(this).transition();
    node.select('path')
        .style('stroke', '#000000')
        .style('stroke-opacity', '1')
        .style('fill', '#6C757D');

    node.select('tspan')
        .style('color', '#FFFFFF')
        .style('fill', '#FFFFFF');
}

function onMouseOut() {
    let node = d3.select(this).transition();
    node.select('path')
        .style('stroke', '#AAAAAA')
        .style('stroke-opacity', '0.5')
        .style('fill', 'inherit');

    node.select('tspan')
        .style('color', 'inherit')
        .style('fill', 'inherit');
}

export { createChart, renderChart, applyChartMouseListeners };