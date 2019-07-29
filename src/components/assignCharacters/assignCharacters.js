import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './assignCharacters.scss';
import { pageMap, evilRoles } from '../../service/page-service';
import pageActions from '../../actions/page';

class AssignCharacters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayerIndex: 0,
            viewMode: 'preview', // preview, viewing
            extraInfo: '',
            observableNames: '',
            reminder: ''
        }
        this.imageMap = {
            merlin: require('../../resource/cool/merlin.jpg'),
            percival: require('../../resource/cool/percival.jpg'),
            servant: require('../../resource/cool/servant.jpg'),
            assassin: require('../../resource/cool/assassin.jpg'),
            mordred: require('../../resource/cool/mordred.jpg'),
            morgana: require('../../resource/cool/morgana.jpg'),
            minion: require('../../resource/cool/minion.jpg'),
            oberon: require('../../resource/cool/oberon.jpg')
        }
    }

    onViewClick = () => {
        let observableNamesArray = []
        switch (this.props.playerList[this.state.currentPlayerIndex].role) {
            case 'merlin':
                observableNamesArray = this.props.playerList
                    .filter(player => evilRoles.filter(role => role !== 'mordred').indexOf(player.role) >= 0)
                    .map(player => player.name);
                this.setState({
                    ...this.state,
                    extraInfo: observableNamesArray.length >= 2 ? 'People holding evil roles are' : 
                        observableNamesArray.length === 1 ? 'Person holding evil role is' : "You can't see anyone",
                    observableNames: observableNamesArray.join(', '),
                    reminder: this.props.playerList.filter(player => player.role === 'mordred').length > 0 ?
                        'Mordred is hiding!' : '',
                    viewMode: 'viewing'
                });
                break;
            case 'percival':
                observableNamesArray = this.props.playerList
                    .filter(player => ['morgana', 'merlin'].indexOf(player.role) >= 0)
                    .map(player => player.name);
                this.setState({
                    ...this.state,
                    extraInfo: observableNamesArray.length >= 2 ? 'Possible Merlins are' : 
                        observableNamesArray.length === 1 ? 'Merlin is possibly' : "You can't see anyone",
                    observableNames: observableNamesArray.join(', '),
                    reminder: '',
                    viewMode: 'viewing'
                });
                break;
            case 'mordred':
                observableNamesArray = this.props.playerList
                    .filter(player => evilRoles.indexOf(player.role) >= 0)
                    .filter(player => player.name !== this.props.playerList[this.state.currentPlayerIndex].name)
                    .map(player => player.name)
                this.setState({
                    ...this.state,
                    extraInfo: observableNamesArray.length >=2 ? 'Your teammates are' :
                        observableNamesArray.length === 1 ? 'Your teammate is' : 'Your are the only one in your team',
                    observableNames: observableNamesArray.join(', '),
                    reminder: this.props.playerList.filter(player => player.role === 'oberon').length > 0 ?
                        'Oberon is hiding!' : '',
                    viewMode: 'viewing'
                });
                break;
            case 'morgana':
                observableNamesArray = this.props.playerList
                    .filter(player => evilRoles.indexOf(player.role) >= 0)
                    .filter(player => player.name !== this.props.playerList[this.state.currentPlayerIndex].name)
                    .map(player => player.name)
                this.setState({
                    ...this.state,
                    extraInfo: observableNamesArray.length >=2 ? 'Your teammates are' :
                        observableNamesArray.length === 1 ? 'Your teammate is' : 'Your are the only one in your team',
                    observableNames: observableNamesArray.join(', '),
                    reminder: this.props.playerList.filter(player => player.role === 'oberon').length > 0 ?
                        'Oberon is hiding!' : '',
                    viewMode: 'viewing'
                });
                break;
            case 'assassin':
                observableNamesArray = this.props.playerList
                    .filter(player => evilRoles.indexOf(player.role) >= 0)
                    .filter(player => player.name !== this.props.playerList[this.state.currentPlayerIndex].name)
                    .map(player => player.name)
                this.setState({
                    ...this.state,
                    extraInfo: observableNamesArray.length >=2 ? 'Your teammates are' :
                        observableNamesArray.length === 1 ? 'Your teammate is' : 'Your are the only one in your team',
                    observableNames: observableNamesArray.join(', '),
                    reminder: this.props.playerList.filter(player => player.role === 'oberon').length > 0 ?
                        'Oberon is hiding!' : '',
                    viewMode: 'viewing'
                });
                break;
            case 'minion':
                observableNamesArray = this.props.playerList
                    .filter(player => evilRoles.indexOf(player.role) >= 0)
                    .filter(player => player.name !== this.props.playerList[this.state.currentPlayerIndex].name)
                    .map(player => player.name)
                this.setState({
                    ...this.state,
                    extraInfo: observableNamesArray.length >=2 ? 'Your teammates are' :
                        observableNamesArray.length === 1 ? 'Your teammate is' : 'Your are the only one in your team',
                    observableNames: observableNamesArray.join(', '),
                    reminder: this.props.playerList.filter(player => player.role === 'oberon').length > 0 ?
                        'Oberon is hiding!' : '',
                    viewMode: 'viewing'
                });
                break;
            case 'oberon':
                this.setState({
                    ...this.state,
                    extraInfo: '',
                    observableNames: '',
                    reminder: '',
                    viewMode: 'viewing'
                });
                break;
            case 'servant':
                this.setState({
                    ...this.state,
                    extraInfo: '',
                    observableNames: '',
                    reminder: '',
                    viewMode: 'viewing',
                });
                break;
            default:
                return;
        }
    }

    onConfirmClick = () => {
        if (this.state.currentPlayerIndex === this.props.playerList.length - 1) {
            this.props.dispatch({type: pageActions.change, page: pageMap.mission});
        }
        this.setState({
            ...this.state,
            currentPlayerIndex: this.state.currentPlayerIndex + 1,
            viewMode: 'preview'
        });
    }

    render() {
        return (
            <div className="assign-characters">
                <div className="player-name">{this.props.playerList[this.state.currentPlayerIndex].name}</div>
                { this.state.viewMode === 'preview' && 
                    <div className="interaction-block preview-role">
                        <div className="message">Click the button below to view your role</div>
                        <button className="btn common" onClick={this.onViewClick}>View</button>
                    </div>
                }
                { this.state.viewMode === 'viewing' && 
                    <div className="interaction-block viewing">
                        <div className="message">You are</div>
                        <div className={classNames("role", 
                            {'evil': ['mordred', 'morgana', 'oberon', 'assassin', 'minion'].indexOf(this.props.playerList[this.state.currentPlayerIndex].role) >= 0})}>
                            {this.props.playerList[this.state.currentPlayerIndex].role.toUpperCase()}</div>
                        <img src={this.imageMap[this.props.playerList[this.state.currentPlayerIndex].role]} alt={this.props.playerList[this.state.currentPlayerIndex].role + 'image'}></img>
                        {this.state.extraInfo && <div className="extra-info">{this.state.extraInfo}</div>}
                        {this.state.observableNames && <div className="name-list">{this.state.observableNames}</div>}
                        {this.state.reminder && 
                            <div className="warning">
                                <i className="far fa-hand-point-right"></i>
                                <div>{this.state.reminder}</div>
                            </div>
                        }
                        <button className="btn common" onClick={this.onConfirmClick}>Got it</button>
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

export default connect(mapStateToProps)(AssignCharacters);