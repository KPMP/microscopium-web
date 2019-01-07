import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import ReactTable from 'react-table';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import "react-table/react-table.css";
import { getFromReactTable } from '../../data/downloadUtil';

const NO_ENTRY = "-";
const P_VALUE = "P Value";
const FC = "FC";

class GeneDataTable extends Component {

    constructor(props) {
        super(props);

        this.getColumns = this.getColumns.bind(this);
        this.getRowCount = this.getRowCount.bind(this);
        this.onTableChange = this.onTableChange.bind(this);
        this.getDownloadData = this.getDownloadData.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            downloadData: []
        };
    }

    componentDidMount() {
        this.onTableChange();
    }

    onTableChange() {
        if (this.reactTable.current) {
            this.setState({
                downloadData: this.getDownloadData()
            });
        }
    }

    getDownloadData() {
        if(this.reactTable !== null && this.reactTable.current !== null) {
            return getFromReactTable(this.reactTable);
        }

        return [];
    }

    getRowCount() {
        if(this.reactTable !== null && this.reactTable.current !== null) {
            return this.reactTable.current.getResolvedState().sortedData.length;
        }

        return 'NA';
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
        },
            {
            Header: this.props.allSitesPrettyNames['umich_sc']
            , columns: [
                {
                    Header: FC
                    , id: "f_umich_sc_avgLogFc"
                    , accessor: (row) => {
                        return row.hasOwnProperty("f_umich_sc_avgLogFc") ? row.f_umich_sc_avgLogFc : NO_ENTRY;
                    }, sortMethod: GeneDataTable.sortWithNoEntry
                    , filterMethod: GeneDataTable.filterWithNoEntry
                },
                {
                    Header: P_VALUE
                    , id: "f_umich_sc_p_val_adj"
                    , accessor: (row) => {
                        return row.hasOwnProperty("f_umich_sc_p_val_adj") ? row.f_umich_sc_p_val_adj : NO_ENTRY;
                    }, sortMethod: GeneDataTable.sortWithNoEntry
                    , filterMethod: GeneDataTable.filterWithNoEntry
                }
            ]
        },
            {
            Header: this.props.allSitesPrettyNames['ucsf_sc']
            , columns: [
                {
                    Header: FC
                    , id: "f_ucsf_sc_avgLogFc"
                    , accessor: (row) => {
                        return row.hasOwnProperty("f_ucsf_sc_avgLogFc") ? row.f_ucsf_sc_avgLogFc : NO_ENTRY;
                    }, sortMethod: GeneDataTable.sortWithNoEntry
                    , filterMethod: GeneDataTable.filterWithNoEntry
                },
                {
                    Header: P_VALUE
                    , id: "f_ucsf_sc_p_val_adj"
                    , accessor: (row) => {
                        return row.hasOwnProperty("f_ucsf_sc_p_val_adj") ? row.f_ucsf_sc_p_val_adj : NO_ENTRY;
                    }, sortMethod: GeneDataTable.sortWithNoEntry
                    , filterMethod: GeneDataTable.filterWithNoEntry
                }
            ]
        },
            {
            Header: this.props.allSitesPrettyNames['ucsd_sn']
            , columns: [
                {
                    Header: FC
                    , id: "f_ucsd_sn_avgLogFc"
                    , accessor: (row) => {
                        return row.hasOwnProperty("f_ucsd_sn_avgLogFc") ? row.f_ucsd_sn_avgLogFc : NO_ENTRY;
                    }, sortMethod: GeneDataTable.sortWithNoEntry
                    , filterMethod: GeneDataTable.filterWithNoEntry
                },
                {
                    Header: P_VALUE
                    , id: "f_ucsd_sn_p_val_adj"
                    , accessor: (row) => {
                        return row.hasOwnProperty("f_ucsd_sn_p_val_adj") ? row.f_ucsd_sn_p_val_adj : NO_ENTRY;
                    }, sortMethod: GeneDataTable.sortWithNoEntry
                    , filterMethod: GeneDataTable.filterWithNoEntry
                }
            ]
        }];
    }

    render() {
        return (
            <Col sm={8} id="gene-data-table">
                <Row className="column-header">
                    <Col className="mr-auto my-auto">
                        <h6>Showing { this.getRowCount() } Genes</h6>
                    </Col>
                    <Col className="col-auto">
                        <CSVLink
                            className="btn btn-primary"
                            data={this.state.downloadData}
                            filename={this.props.selectedCellName + ' Filtered.csv'}
                            target="_blank"
                            >Download CSV
                        </CSVLink>
                    </Col>
                </Row>
                <Row>
                    <ReactTable
                        data={this.props.rows}
                        ref={this.reactTable}
                        onSortedChange={this.onTableChange}
                        onFilteredChange={this.onTableChange}
                        columns={this.getColumns()}
                        defaultPageSize={10}
                        filterable
                        className="-striped -highlight"
                        showPageSizeOptions={false}
                    />
                </Row>
                <Row className="bottom-spacer"></Row>
            </Col>
        );
    }
}

GeneDataTable.propTypes = {
    selectedCellName: PropTypes.string,
    rows: PropTypes.string,
    allSites: PropTypes.arrayOf(PropTypes.string),
    allSitesPrettyNames: PropTypes.arrayOf(PropTypes.string)
};

export default GeneDataTable;