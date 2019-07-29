import React from 'react';
import { connect } from 'react-redux';
import './goodGame.scss';
import { pageMap } from '../../service/page-service';
import pageActions from '../../actions/page';
import gameActions from '../../actions/gameStatus';

class GoodGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="good-game">
                <div className="good-wins">
                    
                </div>
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