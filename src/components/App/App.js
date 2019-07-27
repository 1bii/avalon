import React from 'react';
import { connect } from 'react-redux';
import PlayerSetup from '../playerSetup/playerSetup';
import CharacterSetup from '../characterSetup/characterSetup';
import { pageMap } from '../../service/page-service';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="title app-title">Avalon</div>
        <div className="page-content">
          {this.props.currentPage === pageMap.playerSetup && <PlayerSetup></PlayerSetup>}
          {this.props.currentPage === pageMap.characters && <CharacterSetup></CharacterSetup>}
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
