import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import ReactTable from 'react-table';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import "react-table/react-table.css";
import { getFromReactTable } from '../../data/downloadUtil';
import Instruction from './Instruction';
import isEqual from 'lodash/isEqual';

const NO_ENTRY = "-";
const P_VALUE = "P Value";
const FC = "FC";

class GeneDataTable extends Component {

    constructor(props) {
        super(props);

        this.getColumns = this.getColumns.bind(this);
        this.onSortedChange = this.onSortedChange.bind(this);
        this.onFilteredChange = this.onFilteredChange.bind(this);
        this.resetFilterAndSort = this.resetFilterAndSort.bind(this);
        this.reactTableExists = this.reactTableExists.bind(this);
        this.updateSecondaryState = this.updateSecondaryState.bind(this);
        this.reactTable = React.createRef();

        this.state = {
            sorted: [],
            filtered: [],
            vennFiltered: [],
            downloadData: [],
            columns: this.getColumns(),
            rowCount: 0
        };
    }

    componentDidMount() {
        this.resetFilterAndSort();
    }

    componentDidUpdate() {
        if(!isEqual(this.state.vennFiltered, this.props.vennFilter)) {
            console.log('+++ componentDidUpdate() venn filter setting',
                this.state.filtered,
                this.props.vennFilter);

            this.setState({
                vennFiltered: this.props.vennFilter,
                filtered: this.props.vennFilter
            }, this.updateSecondaryState);
        }
    }

    resetFilterAndSort() {
        this.setState({
            sorted: this.props.defaultSortOrder,
            filtered: []
        }, this.updateSecondaryState);
    }

    onSortedChange(sorted) {
        this.setState({
            sorted: sorted
        }, this.updateSecondaryState);
    }

    onFilteredChange(filtered) {
        this.setState({
            filtered: filtered
        }, this.updateSecondaryState);
    }

    updateSecondaryState() {
        this.setState({
            rowCount: !this.reactTableExists() ? 0 : this.reactTable.current.getResolvedState().sortedData.length,
            downloadData: !this.reactTableExists() ? [] : getFromReactTable(this.reactTable)
        });
    }

    reactTableExists() {
        return this.reactTable !== null && this.reactTable.current !== null;
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
                        <Instruction
                            id="data-table-instruction"
                            title="Using the Gene Expression Data Table"
                            placement="bottom"
                            offset="50%p">
                            <div>
                                <p>Shows the expressed gene measurements considered significant by one or more TIS.
                                Changes to the Venn do not affect this Table and vice versa. Click on a FC or
                                    P Value column title to sort the entire table by that column.</p>
                                <p>Under each column name is a filter input.
                                Filters accept values given in the list below.
                                After you have sorted and filtered the table to your liking, click “Download CSV”
                                    to download the data table in its current sort and filter state.</p>
                                <ul>
                                    <li>+ to exclude genes not measured by this TIS.</li>
                                    <li>- to exclude genes measured by this TIS.</li>
                                    <li>&gt; or &lt; and a number to filter by values above or below the filter criteria. Example: &lt;0.0e-12</li>
                                </ul>
                            </div>
                        </Instruction>
                        &nbsp;
                        <h6>Showing { this.state.rowCount } Genes</h6>
                    </Col>
                    <Col className="col-auto">
                        <Button color="secondary" outline
                            >Reset
                        </Button>
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
                        sorted={this.state.sorted}
                        filtered={this.state.filtered}
                        onSortedChange={this.onSortedChange}
                        onFilteredChange={this.onFilteredChange}
                        columns={this.state.columns}
                        defaultPageSize={10}
                        filterable
                        className="-striped -highlight"
                        showPageSizeOptions={false}
                        noDataText={"No genes found"}
                    />
                </Row>
                <Row className="bottom-spacer" />
            </Col>
        );
    }
}

GeneDataTable.propTypes = {
    selectedCellName: PropTypes.string,
    rows: PropTypes.string,
    allSites: PropTypes.arrayOf(PropTypes.string),
    allSitesPrettyNames: PropTypes.arrayOf(PropTypes.string),
    defaultSortOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    vennFilter: PropTypes.arrayOf(PropTypes.object)
};

export default GeneDataTable;