import React from 'react';
import { connect } from 'react-redux';
import PlayerSetup from '../playerSetup/playerSetup';
import { pageMap } from '../../service/page-service';
import './App.scss';

class App extends React.Component {
  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  }

  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  }

  render() {
    return (
      <div className="App">
        <div className="title app-title">Avalon</div>
        {this.props.currentPage === pageMap.playerSetup && <PlayerSetup></PlayerSetup>}
        {this.props.currentPage === pageMap.characters &&
          <div>
            <button onClick={this.increment}>+</button>
            <div>{ this.props.count }</div>
            <button onClick={this.decrement}>-</button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.characters.count,
  currentPage: state.page.current
});

export default connect(mapStateToProps)(App);
