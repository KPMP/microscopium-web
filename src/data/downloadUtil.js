const atlasColumnNames = [
    'cell',
    'gene',
    'ucsd_avg_log_fc',
    'ucsd_avg_p_val_adj',
    'ucsf_avg_log_fc',
    'ucsf_avg_p_val_adj',
    'umich_avg_log_fc',
    'umich_avg_p_val_adj'
];

function geneDataTableRowMapper(ctx, row) {

    function fixValue(value) {
        value = String(value).replace(new RegExp(ctx.delimiter, 'g'), '\\' + ctx.delimiter);
        return value === '-' ? '' : value;
    }

    let output = [
        row._original.cell,
        row.gene,
        fixValue(row.f_ucsd_sn_avgLogFc),
        fixValue(row.f_ucsd_sn_p_val_adj),
        fixValue(row.f_ucsf_sc_avgLogFc),
        fixValue(row.f_ucsf_sc_p_val_adj),
        fixValue(row.f_umich_sc_avgLogFc),
        fixValue(row.f_umich_sc_p_val_adj)
    ];

    return ctx.asString ? output.join(ctx.delimiter) : output;
}

function getFromReactTable(tableRef, rowMapper = geneDataTableRowMapper, asString = false, delimiter = ',') {
    let rows = tableRef.current.getResolvedState().sortedData.map(rowMapper.bind(null, {
        asString: asString,
        delimiter: delimiter
    }));

    rows.unshift(asString ? atlasColumnNames.join(delimiter) : atlasColumnNames);
    return asString ? rows.join('\n') : rows;
}

export { getFromReactTable, geneDataTableRowMapper };