import React from 'react';
import { connect } from 'react-redux';
import './playerSetup.css';

class PlayerSetup extends React.Component {

    input;

    renderPlayerList = () => {
        console.log(this.props.playerList);
        return this.props.playerList.map((name, i) => <div key={i}>{name}</div>);
    }

    addPlayer = (name) => {
        this.props.dispatch({type: 'ADD_PLAYER', player: name});
    }

    changeMaster = () => {
        this.props.dispatch({type: 'CHANGE_MASTER', master: 'fuck'});
    }

    handleSubmit = (event) => {
        this.addPlayer(this.input);
        event.preventDefault();
        this.forceUpdate();
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={event => this.input = event.target.value} />
                    <button type="submit">Add player</button>
                </form>
                <div>{() => this.renderPlayerList()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.players;
};

export default connect(mapStateToProps)(PlayerSetup);