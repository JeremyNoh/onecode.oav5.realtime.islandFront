import React, { Component } from 'react';
import './App.css';
import Tabs from '../Tabs/index.js'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    nickname : undefined
  }
}

  componentWillMount(){
    let { nickname } = this.state
    if (!(this.props.location.state == undefined)) {
      nickname = this.props.location.state.nickname.nickname
      this.setState({ nickname })
    }
  }

  isConnected = () => {
    if (this.state.nickname) {
      return(
        <p> Choose your game {this.state.nickname } </p>
      );
    }
    else {
      return(
        <a
          className="App-link"
          href="Register"
          rel="noopener noreferrer"
        >
           First Register
        </a>
      )
    }
  }


  render() {
    return (
      <div className="App">

        <header className="App-header">
         {this.state.nickname ? <Tabs nickname={this.state.nickname} /> : null}

          <p>
            Bonjour et bienvenu sur  <code>Jeu.io</code>
          </p>

          {this.isConnected()}
        </header>
      </div>
    );
  }
}

export default App;
