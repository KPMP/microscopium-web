import { connect } from 'react-redux';
import SchematicViewer from './SchematicViewer';
import { setSelectedSites, setSelectedCell } from "../../actions/actions";

const mapStateToProps = (state, props) => ({
    selectedSites: state.selectedSites,
    selectedCell: state.selectedCell
});

const mapDispatchToProps = (dispatch, props) => ({
    setSelectedSites(sites) {
        dispatch(setSelectedSites(sites));
    },
    setSelectedCell(cell) {
        dispatch(setSelectedCell(cell));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SchematicViewer);