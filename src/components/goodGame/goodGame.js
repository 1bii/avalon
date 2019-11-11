import React from 'react';
import { connect } from 'react-redux';
import './goodGame.scss';
import PlayerLine from '../playerLine/playerLine';
import { pageMap, evilRoles } from '../../service/page-service';
import pageActions from '../../actions/page';
import gameActions from '../../actions/gameStatus';

class GoodGame extends React.Component {
    constructor(props) {
        super(props);
        let assassinList = this.props.playerList.filter(player => player.role === 'assassin');
        this.state = {
            canKill: this.props.gameStatus.successCount === 3 && 
                this.props.playerList.filter(player => player.role === 'merlin').length > 0 &&
                assassinList.length > 0,
            victory: this.props.gameStatus.successCount >= 3,
            assassin: assassinList.length > 0 && assassinList[0].name,
            goodGuyList: this.props.playerList.filter(player => evilRoles.indexOf(player.role) < 0),
            selectedMerlin: null
        }
    }

    onPlayerLineClick = (name) => {
        this.setState({
            ...this.state,
            selectedMerlin: name
        });
    }

    onMerlinConfirmClick = () => {
        this.setState({
            ...this.state,
            canKill: false,
            victory: this.state.selectedMerlin !== this.props.playerList.filter(player => player.role === 'merlin')[0].name
        });
    }

    backToHome = async () => {
        await this.props.dispatch({type: gameActions.reset});
        this.props.dispatch({type: pageActions.change, page: pageMap.playerSetup});
    }

    render() {
        return (
            <div className="good-game">
                {  this.state.canKill &&
                    <div className="kill-merlin">
                        <div className="player-name">{this.state.assassin}</div>
                        <div>Assassinate Merlin</div>
                        <div className="player-list-section">
                            {this.state.goodGuyList.map(({name}, i) => 
                                <PlayerLine key={i} name={name} selected={name === this.state.selectedMerlin} onClick={(name) => this.onPlayerLineClick(name)}></PlayerLine>
                            )}
                        </div>
                        <button className="btn common" onClick={this.onMerlinConfirmClick}>Confirm</button>
                    </div>
                }
                { (!this.state.canKill && this.state.victory) &&
                    <div className="game-end">
                        <img src={require('../../resource/cool/victory.png')} alt="victory"></img>
                        <div className="message">Good wins</div>
                        <button className="btn common" onClick={this.backToHome}>Home</button>
                    </div>
                }
                { (!this.state.canKill && !this.state.victory) &&
                    <div className="game-end">
                        <img src={require('../../resource/cool/defeat.png')} alt="defeat"></img>
                        <div className="message">Evil wins</div>
                        <button className="btn common" onClick={this.backToHome}>Home</button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerList: state.players.playerList,
        gameStatus: state.gameStatus
    }
};

export default connect(mapStateToProps)(GoodGame);