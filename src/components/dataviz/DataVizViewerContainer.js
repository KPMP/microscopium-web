import { connect } from 'react-redux';
import DataVizViewer from './DataVizViewer';
import { setSelectedSites, setSelectedCell } from "../../actions/actions";

const mapStateToProps = (state, props) => ({
    selectedSites: state.selectedSites,
    selectedCell: state.selectedCell,
    allSites: state.allSites,
    allSitePrettyNames: state.allSitePrettyNames
});

const mapDispatchToProps = (dispatch, props) => ({
    setSelectedSites(sites) {
        dispatch(setSelectedSites(sites));
    },
    setSelectedCell(cell) {
        dispatch(setSelectedCell(cell));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataVizViewer);