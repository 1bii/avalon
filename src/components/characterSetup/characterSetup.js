import React from 'react';
import { connect } from 'react-redux';
import './characterSetup.scss';
import { pageMap } from '../../service/page-service';
import characterActions from '../../actions/characters';
import pageActions from '../../actions/page';

class CharacterSetup extends React.Component {
    constructor() {
        super();
        this.characterCount = 0;
    }

    increaseCharacter = (name) => {
        this.props.dispatch({type: characterActions.increment, characterName: name});
    }

    decreaseCharacter = (name) => {
        this.props.dispatch({type: characterActions.decrement, characterName: name});
    }

    resetCharacter = () => {
        this.props.dispatch({type: characterActions.reset});
    }

    backToHome = () => {
        this.resetCharacter();
        this.props.dispatch({type: pageActions.change, page: pageMap.playerSetup});
    }

    render() {
        return (
            <div className="character-setup">
                <div className="character-list">{Object.keys(this.props.characterList).map((name, i) => {
                    let displayName = name.toUpperCase();
                    return (
                        <div className="character-line" key={i}>
                            <div className="character-name">{displayName}</div>
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
                { this.props.playerList.length - this.props.selectedCount > 0 &&
                    <div className="warning">{`${this.props.playerList.length - this.props.selectedCount} left to be added`}</div>
                }
                { this.props.playerList.length === this.props.selectedCount &&
                    <div>All set</div>
                }
                <div className="final-button-section">
                    <button className="btn clear" onClick={this.backToHome}>Home</button>
                    <button className="btn clear" onClick={this.resetCharacter}>Reset</button>
                    <button className="btn common">Start</button>
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
        page: state.page.current
    }
};

export default connect(mapStateToProps)(CharacterSetup);