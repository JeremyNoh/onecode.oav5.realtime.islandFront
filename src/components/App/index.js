import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TabNavigation , Tab } from 'evergreen-ui'
import Tabs from '../Tabs/index.js'

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    nickname : undefined
  }
}

  componentWillMount(){
    // const tete = "dede"
    // const tabs = ['Docs', 'MagicNumber', 'KeyFast','KeyWord','jsp']
  }
  render() {
    console.log(this.state.tabs);
    return (
      <div className="App">

        <header className="App-header">
          <Tabs/>
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
