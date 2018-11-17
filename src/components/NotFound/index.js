import React, { Component } from 'react';
import './App.css';
import { TextInput , Button , FormField , TextInputField, toaster} from 'evergreen-ui'
import Tabs from '../Tabs/index.js'

class NotFound extends Component {

  constructor(props) {
  super(props);
  this.state = {
    nickname : '',
    success : false
  }
}


  render() {
    return (
      <div className="App">
      <header className="App-header">
        <Tabs />
        <p>This routes is not defined</p>
        <a
          className="App-link"
          href="/"
          rel="noopener noreferrer"
        >
           Go to Home
        </a>
      </header>
      </div>
    );
  }
}

export default NotFound;
