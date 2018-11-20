import React, { Component} from 'react';
import './App.css';
import { TextInput , Button , FormField , toaster} from 'evergreen-ui'
import Tabs from '../Tabs/index.js'


class Register extends Component {

  constructor(props) {
  super(props);
  this.state = {
    nickname : '',
    success : false
  }
}

  submit = () => {
    if(this.state.nickname === ''){
      toaster.danger(
      'enter a surname'
    )
    }
    else {
      toaster.success(
      `Welcome ${this.state.nickname}` ,
      {
        description: 'you will be charg the content.'
      }
    )
    this.setState({success :true})
    }
  }

  formUI = () => {
    if (this.state.success === false) {
      return (
        <header className="App-header">
          <p>Register </p>
          <FormField  label= ''>
            <TextInput
              label="A controlled text input field"
              required
              description="This is a description."
              value={this.state.nickname}
              onChange={e => this.setState({ nickname: e.target.value })}
            />
            <Button marginRight={16} appearance="primary" intent="success" onClick={this.submit}>Submit</Button>
            </ FormField>
        </header>
      )
    }
  }

  pickUI =() => {
      if (this.state.success) {
        return(
          <header className="App-header">
            <Tabs nickname={this.state.nickname} />
            <p>Select Your game </p>
          </header>
        )
      }

  }

  render() {
    return (
      <div className="App">
      {this.formUI()}
      {this.pickUI()}
      </div>
    );
  }
}

export default Register;
