import React from 'react';
import { connect } from 'react-redux';
import './playerSetup.scss';
import { pageMap } from '../../service/page-service';

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
            this.props.dispatch({type: 'ADD_PLAYER', player: this.input.current.value});
            this.input.current.value = '';
        }
        event.preventDefault();
    }

    startGame = () => {
        this.props.dispatch({type: 'CHANGE_PAGE', page: pageMap.characters})
    }
    
    render() {
        return (
            <div className="player-setup">
                <div className="title">Please add players</div>
                <div>
                    <input type="text" ref={this.input} onKeyDown={this.handleInputEnter}/>
                    <button className="btn add-player" onClick={this.addPlayer}>Add player</button>
                </div>
                <div className="name-section">{this.props.playerList.map((name, i) => <div className="name-item" key={i}>{name}</div>)}</div>
                <button className="btn start-game" onClick={this.startGame}>Let's Go</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerList: state.players.playerList,
        page: state.page.current
    }
};

export default connect(mapStateToProps)(PlayerSetup);