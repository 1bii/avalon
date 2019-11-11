import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './mission.scss';
import PlayerLine from '../playerLine/playerLine';
import Vote from './vote';
import { pageMap, rules } from '../../service/page-service';
import pageActions from '../../actions/page';
import gameActions from '../../actions/gameStatus';

class Mission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMode: 'choose', // choose, approve, vote, result
            rule: rules[this.props.playerList.length],
            resultSuccess: true, // true: show success in result page, false: show fail
            showMemberCountExceedWarning: false,

            // for voting
            selectedTeamList: [],

            // for result
            failCount: 0
        }
        // random generate leader
        const randomLeaderIndex = Math.floor(Math.random() * this.props.playerList.length);
        this.props.dispatch({type: gameActions.setLeader, index: randomLeaderIndex});
        // set lake goddess
        if (this.props.preference.lakeGoddess) {
            this.props.dispatch({type: gameActions.addLakeGoddess,
                index: (randomLeaderIndex + this.props.playerList.length) % this.props.playerList.length});
        }
    }

    onPlayerLineClick = (name) => {
        // check if reached team limit
        let currentRound = this.props.gameStatus.round;
        if (this.props.gameStatus.selectedTeam.size >= this.state.rule.roundTeamCount[currentRound] &&
            !this.props.gameStatus.selectedTeam.has(name)) {
            this.setState({
                ...this.state,
                showMemberCountExceedWarning: true
            });
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    showMemberCountExceedWarning: false
                });
            }, 3000);
            return;
        }
        // ok to add
        this.setState({
            ...this.state,
            showMemberCountExceedWarning: false
        });
        this.props.dispatch({type: gameActions.selectPlayer, name: name});
    }

    onChooseTeamConfirm = () => {
        this.setState({
            ...this.state,
            showMode: 'approve'
        });
    }

    getNextLeaderIndex = () => {
        return (this.props.gameStatus.leaderIndex + 1) % this.props.playerList.length;
    }

    finishRound = async (success) => {
        if (success) await this.props.dispatch({type: gameActions.addSuccess});
        // check if reaches the end of the game
        if (this.props.gameStatus.round === 4 || this.props.gameStatus.successCount === 3) {
            // end the game
            this.props.dispatch({type: gameActions.endGame});
            this.props.dispatch({type: pageActions.change, page: pageMap.goodGame});
        } else {
            // step to next round
            await this.props.dispatch({type: gameActions.stepToNextRound});
            if (this.props.gameStatus.round - this.props.gameStatus.successCount === 3) {
                // fail 3 times, end the game
                this.props.dispatch({type: gameActions.endGame});
                this.props.dispatch({type: pageActions.change, page: pageMap.goodGame});
            }
            this.setState({
                ...this.state,
                showMode: 'result',
                resultSuccess: success
            });
        }
    }

    onApprove = async (feedback) => {
        if (feedback) {
            this.setState({
                ...this.state,
                showMode: 'vote',
                selectedTeamList: [...this.props.gameStatus.selectedTeam]
            });
            await this.props.dispatch({type: gameActions.setLeader, index: this.getNextLeaderIndex()});
            await this.props.dispatch({type: gameActions.clearPlayer});
        } else { // disapprove
            // check if reaches 5 rejects
            if (this.props.gameStatus.rejects === 4) {
                // fail
                this.finishRound(false);
            } else {
                // add rejects
                await this.props.dispatch({type: gameActions.clearPlayer});
                await this.props.dispatch({type: gameActions.addRejects});
                await this.props.dispatch({type: gameActions.setLeader, index: this.getNextLeaderIndex()});
                this.setState({
                    ...this.state,
                    showMode: 'choose'
                });
            }
        }
    }

    onVoteFinish = (failCount) => {
        this.setState({
            ...this.state,
            failCount: failCount
        });
        if ((this.props.gameStatus.round === 3 && this.state.rule.twoFail && failCount >= 2) || (failCount > 0)) {
            this.finishRound(false);
        } else {
            this.finishRound(true);
        }
    }

    onResultConfirm = () => {
        this.setState({
            ...this.state,
            showMode: 'choose',
            resultSuccess: true,
            showMemberCountExceedWarning: false,
            selectedTeamList: [],
            failCount: 0
        });
    }

    render() {
        return (
            <div className="mission-page">
                <div className="current-status">
                    <i className="fas fa-chess-rook"></i>
                    <div>:</div>
                    <div className="number">{this.props.gameStatus.round + 1}</div>
                    <i className="far fa-thumbs-down"></i>
                    <div>:</div>
                    <div className="number">{this.props.gameStatus.rejects}</div>
                    <i className="fas fa-heart"></i>
                    <div>:</div>
                    <div className="number blue">{this.props.gameStatus.successCount}</div>
                    <i className="fas fa-heart-broken"></i>
                    <div>:</div>
                    <div className="number red">{this.props.gameStatus.round - this.props.gameStatus.successCount}</div>
                </div>
                {this.state.showMode === 'choose' &&
                    <div className="choose-team">
                        <div className="player-name">{this.props.playerList[this.props.gameStatus.leaderIndex].name}</div>
                        <div className="message">Please choose your team</div>
                        <div className="message small">{`(${this.state.rule.roundTeamCount[this.props.gameStatus.round]} members)`}</div>
                        {this.props.playerList.map((player, i) => 
                            <PlayerLine key={i} name={player.name} selected={this.props.gameStatus.selectedTeam.has(player.name)} onClick={(name) => this.onPlayerLineClick(name)}></PlayerLine>
                        )}
                        { this.state.showMemberCountExceedWarning && 
                            <div className="warning">
                                <i className="far fa-hand-point-right"></i>
                                <div>You can't pick more</div>
                            </div>
                        }
                        <button className="btn common" 
                            disabled={this.props.gameStatus.selectedTeam.size < this.state.rule.roundTeamCount[this.props.gameStatus.round]}
                            onClick={this.onChooseTeamConfirm}>Go</button>
                    </div>
                }
                {this.state.showMode === 'approve' && 
                    <div className="approve-page">
                        <div>Does everyone agree with this team?</div>
                        <button className="btn common" onClick={() => this.onApprove(true)}>Yes</button>
                        <button className="btn clear" onClick={() => this.onApprove(false)}>No</button>
                    </div>
                }
                {this.state.showMode === 'vote' &&
                    <Vote voters={this.state.selectedTeamList} onFinish={this.onVoteFinish}></Vote>
                }
                {this.state.showMode === 'result' && 
                    <div className="result-page">
                        <div className={classNames('result', {'success': this.state.resultSuccess})}>
                            {`${this.state.resultSuccess ? 'SUCCESS' : 'FAIL'}`}
                        </div>
                        {(this.state.selectedTeamList.length - this.state.failCount) > 0 && <div className="show-vote-block">
                            {Array(this.state.selectedTeamList.length - this.state.failCount).fill().map(() => {
                                return <div className="votes success">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                            })}
                        </div>}
                        {(this.state.failCount > 0) && <div className="show-vote-block">
                            {Array(this.state.failCount).fill().map(() => {
                                return <div className="votes fail">
                                    <i className="fas fa-times-circle"></i>
                                </div>
                            })}
                        </div>}
                        <button className="btn common" onClick={this.onResultConfirm}>OK</button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerList: state.players.playerList,
        gameStatus: state.gameStatus,
        preference: state.preference
    }
};

export default connect(mapStateToProps)(Mission);