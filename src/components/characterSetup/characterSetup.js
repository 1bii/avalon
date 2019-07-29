import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './characterSetup.scss';
import { pageMap } from '../../service/page-service';
import characterActions from '../../actions/characters';
import pageActions from '../../actions/page';
import playerActions from '../../actions/players';

class CharacterSetup extends React.Component {
    increaseCharacter = (name) => {
        this.props.dispatch({type: characterActions.increment, characterName: name});
    }

    decreaseCharacter = (name) => {
        this.props.dispatch({type: characterActions.decrement, characterName: name});
    }

    resetCharacter = () => {
        this.props.dispatch({type: characterActions.reset});
    }

    startGame = async () => {
        await this.props.dispatch({type: characterActions.shuffle});
        console.log(this.props.assignableList);
        await this.props.dispatch({type: playerActions.setRole, assignableList: this.props.assignableList});
        console.log(this.props.playerList);
        this.props.dispatch({type: pageActions.change, page: pageMap.assignCharacters});
    }

    isGoodEvilBalanced = () => {
        return (Object.keys(this.props.characterList).filter(name => this.props.characterList[name].order > 2 && this.props.characterList[name].count > 0).length > 0)
        && (Object.keys(this.props.characterList).filter(name => this.props.characterList[name].order <= 2 && this.props.characterList[name].count > 0).length > 0);
    }

    render() {
        return (
            <div className="character-setup">
                <div className="character-list">{Object.keys(this.props.characterList)
                    .sort((a, b) => this.props.characterList[a].order - this.props.characterList[b].order)
                    .map((name, i) => {
                    let displayName = name.toUpperCase();
                    return (
                        <div className="character-line" key={i}>
                            <div className={classNames("character-name", {'evil': this.props.characterList[name].order > 2})}>{displayName}</div>
                            <div className="control-section">
                                <button className="btn common minus"
                                disabled={this.props.characterList[name].count <= 0}
                                onClick={() => this.decreaseCharacter(name)}
                                >-</button>
                                <div className="count">{this.props.characterList[name].count}</div>
                                <button className="btn common plus" 
                                disabled={(this.props.characterList[name].count >= this.props.characterList[name].maxCount) || this.props.playerList.length === this.props.selectedCount}
                                onClick={() => this.increaseCharacter(name)}
                                >+</button>
                            </div>
                        </div>
                    );
                })}</div>
                <div className="message-to-user">
                    { this.props.playerList.length - this.props.selectedCount > 0 &&
                        <div className="message-line warning">
                            <i className="far fa-hand-point-right"></i>
                            <div>{`${this.props.playerList.length - this.props.selectedCount} left to be added`}</div>
                        </div>
                    }
                    { !this.isGoodEvilBalanced() &&
                        <div className="message-line warning">
                            <i className="far fa-hand-point-right"></i>
                            <div>Must have at least 1 player in each team</div>
                        </div>
                    }
                    { this.props.playerList.length === this.props.selectedCount && this.isGoodEvilBalanced() &&
                        <div className="message-line all-set">
                            <i className="fas fa-check"></i>
                            <div>All set</div>
                        </div>
                    }
                </div>
                <div className="final-button-section">
                    <button className="btn clear" onClick={this.resetCharacter}>Reset</button>
                    <button className="btn common" onClick={this.startGame} disabled={this.props.playerList.length > this.props.selectedCount || !this.isGoodEvilBalanced()}>Start</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playerList: state.players.playerList,
        characterList: state.characters.characterList,
        selectedCount: state.characters.selectedCount,
        assignableList: state.characters.assignableList
    }
};

export default connect(mapStateToProps)(CharacterSetup);