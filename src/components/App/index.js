import React, { Component } from 'react';
import './App.css';
// import Tabs from '../Tabs/index.js'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    nickname : undefined
  }
}

  componentWillMount(){
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <p>
            Bonjour et bienvnu sur  <code>Jeu.io</code>
          </p>
          <a
            className="App-link"
            href="Register"
            rel="noopener noreferrer"
          >
             First Register
          </a>
        </header>
      </div>
    );
  }
}

export default App;
