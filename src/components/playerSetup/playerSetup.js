import React from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import './playerSetup.scss';
import { pageMap } from '../../service/page-service';
import playerActions from '../../actions/players';
import pageActions from '../../actions/page';

class PlayerSetup extends React.Component {
    constructor(props) {
        super(props);
        const { cookies } = this.props;
        this.input = React.createRef();
        this.state = {
            showDuplicateWarning: false,
            showOverflowWarning: false
        }
        let playerListFromCookie = cookies.get('avalonPlayerList');
        if (playerListFromCookie) {
            this.props.dispatch({type: playerActions.initialWithData, data: playerListFromCookie});
        }
    }

    handleInputEnter = (event) => {
        if (event.key === 'Enter') {
            this.addPlayer(event);
        }
    }

    addPlayer = (event) => {
        if (this.input && this.input.current && this.input.current.value !== '') {
            // check duplicate name
            if (this.props.playerList.filter(player => player.name === this.input.current.value).length > 0) {
                this.setState({
                    ...this.state,
                    showDuplicateWarning: true
                });
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        showDuplicateWarning: false
                    });
                }, 3000);
                return;
            }
            // check overflow
            if (this.props.playerList.length >= 10) {
                this.setState({
                    ...this.state,
                    showOverflowWarning: true
                });
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        showOverflowWarning: false
                    });
                }, 3000);
                return;
            }
            this.props.dispatch({type: playerActions.add, player: this.input.current.value});
            this.input.current.value = '';
        }
        event.preventDefault();
    }

    startGame = async () => {
        // await this.props.dispatch({type: playerActions.shuffle});
        this.props.cookies.set('avalonPlayerList', this.props.playerList);
        this.props.dispatch({type: pageActions.change, page: pageMap.characters});
    }
    clearPlayers = () => {
        this.props.cookies.set('avalonPlayerList', []);
        this.props.dispatch({type: playerActions.clear});
    }
    
    render() {
        return (
            <div className="player-setup">
                <div className="title">Please add players</div>
                <div className="input-section">
                    <input type="text" ref={this.input} onKeyDown={this.handleInputEnter} placeholder="Ex: Alex"/>
                    <button className="btn common add-player" onClick={this.addPlayer}>Add</button>
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
                    <div className="warning">
                        <i className="far fa-hand-point-right"></i>
                        <div>You need at least five players</div>
                    </div>
                }
                { this.state.showOverflowWarning && 
                    <div className="warning">
                        <i className="far fa-hand-point-right"></i>
                        <div>Players number exceeded!</div>
                    </div>
                }
                { this.state.showDuplicateWarning && 
                    <div className="warning">
                        <i className="far fa-hand-point-right"></i>
                        <div>Name existed!</div>
                    </div>
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

export default withCookies(connect(mapStateToProps)(PlayerSetup));