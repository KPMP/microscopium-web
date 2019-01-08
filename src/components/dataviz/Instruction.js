import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class Instruction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.node = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleClick(e) {
        if(!this.node.current.contains(e.target)) {
            this.setState({
                isOpen: false
            });
        }
    }

    handleToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        document.body.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousedown', this.handleClick, false);
    }



    render() {
        return (
            <div ref={this.node} className="instruction-wrapper">
                <Button
                    color="primary"
                    outline tag="a"
                    className="instruction"
                    id={this.props.id + '-button'}
                    onClick={this.handleToggle}>
                    <FontAwesomeIcon icon={faInfoCircle} size="sm"/>
                </Button>
                <Popover
                    target={this.props.id + '-button'}
                    isOpen={this.state.isOpen}
                    placement={this.props.placement}
                    className={this.props.id + '-popover'}
                    offset={this.props.offset}>
                    <PopoverHeader>{this.props.title}</PopoverHeader>
                    <PopoverBody>{this.props.children}</PopoverBody>
                </Popover>
            </div>
        );
    }
}

Instruction.propTypes = {
    id: PropTypes.String.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    placement: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
    offset: PropTypes.String
};

Instruction.defaultProps = {
    placement: 'bottom',
    offset: '50%'
};

export default Instruction;