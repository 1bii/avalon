import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './playerLine.scss';

class PlayerLine extends React.Component {
    // props: name, selected, onClick

    render() {
        return (
            <div className={classNames('player-line', {'selected': this.props.selected})} 
                onClick={() => this.props.onClick(this.props.name)}>
                {this.props.gameStatus.selectedTeam.has(this.props.name) &&
                    <i className="far fa-check-circle"></i>
                }
                <div>{this.props.name}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameStatus: state.gameStatus
    }
};

export default connect(mapStateToProps)(PlayerLine);