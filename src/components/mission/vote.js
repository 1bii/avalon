import React from 'react';
import { connect } from 'react-redux';
import './vote.scss';
import { evilRoles } from '../../service/page-service';

class Vote extends React.Component {
    constructor(props) {
        super(props); // voters, onFinish(failCount)
        this.state = {
            showInvalidFailWarning: false,
            voterIndex: 0,
            failCount: 0
        }
    }

    isFailValid = () => {
        let playerRole = this.props.playerList.filter(player => player.name === this.props.voters[this.state.voterIndex])[0].role;
        if (evilRoles.indexOf(playerRole) < 0) {
            // can not vote for fail
            this.setState({
                ...this.state,
                showInvalidFailWarning: true
            });
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    showInvalidFailWarning: false
                });
            }, 3000);
            return false;
        }
        return true;
    }

    onVoteClick = (success) => {
        this.setState({
            ...this.state,
            showInvalidFailWarning: false
        });
        console.log(success);
        // if is the last one
        if (this.state.voterIndex === this.props.voters.length - 1) {
            if (success) this.props.onFinish(this.state.failCount);
            else if (this.isFailValid()) this.props.onFinish(this.state.failCount + 1);
            else return;
            // clear state
            return this.state = {
                showInvalidFailWarning: false,
                voterIndex: 0,
                failCount: 0
            }
        }
        // keep moving on
        if (success) {
            this.setState({
                ...this.state,
                voterIndex: this.state.voterIndex + 1
            });
        } else if (this.isFailValid()) {
            this.setState({
                ...this.state,
                voterIndex: this.state.voterIndex + 1,
                failCount: this.state.failCount + 1
            });
        }
    }

    render() {
        return (
            <div className="vote-page">
                <div className="player-name">{this.props.voters[this.state.voterIndex]}</div>
                <div className="message">Please vote</div>
                <div className="button-section">
                    <button className="btn success" onClick={() => this.onVoteClick(true)}>Success</button>
                    <button className="btn fail" onClick={() => this.onVoteClick(false)}>Fail</button>
                </div>
                {this.state.showInvalidFailWarning && 
                    <div className="warning">
                        <i className="far fa-hand-point-right"></i>
                        <div>Justice will never fail</div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameStatus: state.gameStatus,
        playerList: state.players.playerList
    }
};

export default connect(mapStateToProps)(Vote);