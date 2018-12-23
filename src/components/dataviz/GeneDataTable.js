import React, { Component } from 'react';
import ReactTable from 'react-table';
//import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';

const NO_ENTRY = "-";

class GeneDataTable extends Component {

    constructor(props) {
        super(props);

        this.getColumns = this.getColumns.bind(this);
    }

    static sortWithNoEntry(a, b) {
        if (a === b) {
            return 0;
        }

        if (a === NO_ENTRY) {
            return 1;
        }

        else if (b === NO_ENTRY) {
            return -1;
        }

        else {
            return parseFloat(a) > parseFloat(b) ? -1 : 1;
        }
    }

    static filterWithNoEntry(filter, row) {
        let gtStatement = filter.value.indexOf(">") === 0
            , ltStatement = filter.value.indexOf("<") === 0
            , existsStatement = filter.value.indexOf("+") === 0
            , exists = row[filter.id] === NO_ENTRY;

        if(filter.value === NO_ENTRY) {
            return exists === true;
        }

        else if(existsStatement) {
            return exists === false;
        }

        else if(gtStatement || ltStatement) {
            let numberMatch = filter.value.match(/[-\dEe.]+/g)
                , filterNumber = parseFloat(numberMatch)
                , filterRowValue = parseFloat(row[filter.id]);

            if(isNaN(numberMatch)) {
                return false;
            }

            return gtStatement ? filterRowValue > filterNumber : filterRowValue < filterNumber;
        }

        else {
            return parseFloat(row[filter.id]) !== parseFloat(filter.value);
        }

    }

    getColumns() {
        return [{
            Header: "Gene"
            , id: "gene"
            , accessor: "gene"
        },{
            Header: "UMICH SC"
            , id: "umich_sc"
            , accessor: (row) => {
                return row.hasOwnProperty("f_umich_sc_p_val_adj") ? row.f_umich_sc_p_val_adj : NO_ENTRY;
            }, sortMethod: GeneDataTable.sortWithNoEntry
            , filterMethod: GeneDataTable.filterWithNoEntry
        },{
            Header: "UCSF SC"
            , id: "ucsf_sc"
            , accessor: (row) => {
                return row.hasOwnProperty("f_ucsf_sc_p_val_adj") ? row.f_ucsf_sc_p_val_adj : NO_ENTRY;
            }, sortMethod: GeneDataTable.sortWithNoEntry
            , filterMethod: GeneDataTable.filterWithNoEntry
        },{
            Header: "UCSD SN"
            , id: "ucsd_sn"
            , accessor: (row) => {
                return row.hasOwnProperty("f_ucsd_sn_p_val_adj") ? row.f_ucsd_sn_p_val_adj : NO_ENTRY;
            }, sortMethod: GeneDataTable.sortWithNoEntry
            , filterMethod: GeneDataTable.filterWithNoEntry
        },];
    }

    render() {
        return (<ReactTable
            data={this.props.rows}
            columns={this.getColumns()}
            defaultPageSize={10}
            filterable
            />
        );
    }
}

GeneDataTable.propTypes = {
    rows: PropTypes.string
};

export default GeneDataTable;