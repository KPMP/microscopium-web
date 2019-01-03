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

    return [
        row._original.cell,
        row.gene,
        fixValue(row.f_ucsd_sn_avgLogFc),
        fixValue(row.f_ucsd_sn_p_val_adj),
        fixValue(row.f_ucsf_sc_avgLogFc),
        fixValue(row.f_ucsf_sc_p_val_adj),
        fixValue(row.f_umich_sc_avgLogFc),
        fixValue(row.f_umich_sc_p_val_adj)
    ].join(ctx.delimiter);
}

function getDelimitedFromReactTable(tableRef, rowMapper = geneDataTableRowMapper, delimiter = ',') {
    let rows = tableRef.current.getResolvedState().sortedData.map(rowMapper.bind(null, {
        delimiter: delimiter
    }));

    rows.unshift(atlasColumnNames.join(delimiter));

    return rows.join('\n');
}

export { getDelimitedFromReactTable, geneDataTableRowMapper };