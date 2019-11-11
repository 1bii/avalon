import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PlayerSetup from '../playerSetup/playerSetup';
import CharacterSetup from '../characterSetup/characterSetup';
import AssignCharacter from '../assignCharacters/assignCharacters';
import Mission from '../mission/mission';
import GoodGame from '../goodGame/goodGame';
import Header from '../Header/Header';
import Setting from '../Setting/Setting';
import { pageMap } from '../../service/page-service';
import './App.scss';

class App extends React.Component {
  Home = () => {
    return (
      <div className="page-content">
        {this.props.currentPage === pageMap.playerSetup && <PlayerSetup></PlayerSetup>}
        {this.props.currentPage === pageMap.characters && <CharacterSetup></CharacterSetup>}
        {this.props.currentPage === pageMap.assignCharacters && <AssignCharacter></AssignCharacter>}
        {this.props.currentPage === pageMap.mission && <Mission></Mission>}
        {this.props.currentPage === pageMap.goodGame && <GoodGame></GoodGame>}
      </div>
    );
  }



  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Route path="/" exact component={this.Home} />
          <Route path="/setting" component={Setting} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.characters.count,
  currentPage: state.page.current
});

export default connect(mapStateToProps)(App);
