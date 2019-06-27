import React from 'react';
import { connect } from 'react-redux';
import './App.css';

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
        <button onClick={this.increment}>+</button>
        <div>{ this.props.count }</div>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = ({count}) => ({count});

export default connect(mapStateToProps)(App);
