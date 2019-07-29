import React from 'react';
import { connect } from 'react-redux';
import './playerSetup.scss';
import { pageMap } from '../../service/page-service';
import playerActions from '../../actions/players';
import pageActions from '../../actions/page';

class PlayerSetup extends React.Component {
    constructor() {
        super();
        this.input = React.createRef();
    }

    handleInputEnter = (event) => {
        if (event.key === 'Enter') {
            this.addPlayer(event);
        }
    }

    addPlayer = (event) => {
        if (this.input && this.input.current && this.input.current.value !== '') {
            this.props.dispatch({type: playerActions.add, player: this.input.current.value});
            this.input.current.value = '';
        }
        event.preventDefault();
    }

    startGame = () => {
        this.props.dispatch({type: pageActions.change, page: pageMap.characters});
    }
    clearPlayers = () => {
        this.props.dispatch({type: playerActions.clear});
    }
    
    render() {
        return (
            <div className="player-setup">
                <div className="title">Please add players</div>
                <div>
                    <input type="text" ref={this.input} onKeyDown={this.handleInputEnter}/>
                    <button className="btn common add-player" onClick={this.addPlayer}>Add player</button>
                </div>
                <div className="name-section">{this.props.playerList.map(({name}, i) => 
                    <div className="name-item" key={i}>{`${i+1}. ${name}`}</div>
                )}</div>
                <div className="button-section">
                    { this.props.playerList.length > 0 && 
                        <button className="btn clear" onClick={this.clearPlayers}>Clear</button>
                    }
                    { this.props.playerList.length >= 5 && 
                        <button className="btn common start-game" onClick={this.startGame}>Let's Go</button>
                    }
                </div>
                
                { this.props.playerList.length < 5 && 
                    <div className="warning">You need at least five players</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerList: state.players.playerList
    }
};

export default connect(mapStateToProps)(PlayerSetup);