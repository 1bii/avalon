import React from 'react';
import { connect } from 'react-redux';
import './playerSetup.css';

class PlayerSetup extends React.Component {
    playerList = [
        'Amy',
        'Bob',
        'Christel'
    ];

    createTable = () => {
        return this.playerList.map(name => <div>{name}</div>);
    }
    
    render() {
        return (
            <div>
                {this.createTable()}
            </div>
        );
    }
}

export default PlayerSetup;