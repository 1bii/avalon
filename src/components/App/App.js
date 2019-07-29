import React from 'react';
import { connect } from 'react-redux';
import pageActions from '../../actions/page';
import PlayerSetup from '../playerSetup/playerSetup';
import CharacterSetup from '../characterSetup/characterSetup';
import AssignCharacter from '../assignCharacters/assignCharacters';
import { pageMap } from '../../service/page-service';
import './App.scss';

class App extends React.Component {
  backToHome = () => {
    this.props.dispatch({type: pageActions.change, page: pageMap.playerSetup});
  }

  render() {
    return (
      <div className="App">
        <div className="title-section">
          <div className="title app-title">Avalon</div>
          {this.props.currentPage !== pageMap.playerSetup && <i className="fas fa-home" onClick={this.backToHome}></i>}
        </div>
        <div className="page-content">
          {this.props.currentPage === pageMap.playerSetup && <PlayerSetup></PlayerSetup>}
          {this.props.currentPage === pageMap.characters && <CharacterSetup></CharacterSetup>}
          {this.props.currentPage === pageMap.assignCharacters && <AssignCharacter></AssignCharacter>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.characters.count,
  currentPage: state.page.current
});

export default connect(mapStateToProps)(App);
