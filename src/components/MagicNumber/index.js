import React, { Component , Fragment} from 'react';
import './App.css';
import { Alert ,Button  , toaster, SideSheet,Pane,Heading,Paragraph, Card, TextInput} from 'evergreen-ui'
// import io from 'socket.io-client';
import openSocket from 'socket.io-client';


import Tabs from '../Tabs/index.js'

class MagicNumber extends Component {


  constructor(props) {



  super(props);
  this.state = {
    nickname : 'Jeremy Noh',
    time : 42000,
    start : false,
    secretNumber : undefined,
    counterKey : 0,
    finish : false,
    msgDetail : [],
    numberTry : 0
  }
}
componentDidMount(){
  // const socket = io('http://localhost:5000');
  const socket = openSocket('http://localhost:5000/magic');
  socket.emit("join", this.state.nickname)
  socket.on("welcome", str => {
    // console.log(str);
    toaster.success(
       str,
       {
         duration: 5
       }
     )
  })
  this.setState({socket})
}


startTheGame = () => {

  let { start, socket } = this.state

  socket.emit("start")
  socket.on("start", () => {

  })
  start = !start
  this.setState({start})
}

messageEmit = () => {
  let { socket ,msgDetail } = this.state
  socket.on("magicNumberMessage", str => {
  msgDetail.push(str)
  console.log(msgDetail);
  this.setState({msgDetail})
  })
}

tryNumber = () => {
  console.log(this.state.numberTry);
  this.state.socket.emit("number",this.state.numberTry)
  this.messageEmit()
}

beforeStart = () => {
  if (!this.state.start) {
    return(
      <Pane >
      <Heading >
       {this.state.secretNumber === undefined ?"Waiting ..." : `Find me`}
      </Heading>
        <Button onClick={() => this.startTheGame()} disabled= {this.state.start}>
          START
        </Button>
       </Pane>
    )
  }
}


inputPlayerUI = () => {
  if (this.state.start) {
    return (
      <Pane >
      <Heading> Select a number beetween 0 and 1337</Heading>
        <TextInput
          label="A controlled text input field"
          required
          description="This is a description."
          value={this.state.numberTry}
          onChange={e => this.setState({ numberTry: e.target.value })}
        />
        <Button marginRight={16} appearance="primary" intent="success" onClick={this.tryNumber}>Submit</Button>
       </Pane >
    )
  }
}


 contentPlay = () =>{
   return (
     <Fragment>
     <SideSheet
       isShown={this.state.isShown}
       onCloseComplete={() => this.setState({ isShown: false })}
       containerProps={{
         display: 'flex',
         flex: '1',
         flexDirection: 'column',
       }}
     >
       <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
         <Pane padding={16}>
           <Heading size={600}>Welcome to the Game </Heading>
           <Paragraph size={400}>
            Rules : generate a random number and you need toguess the number
           </Paragraph>
         </Pane>
       </Pane>
       <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
         <Card
           backgroundColor="white"
           elevation={0}
           height={240}
           display="flex"
           alignItems="center"
           justifyContent="center"
         >
          {this.beforeStart()}
          {this.inputPlayerUI()}

         </Card>
         {
           this.state.msgDetail.map(function(item, i){
             return (
                   <Alert
                   key = {i}
                   appearance="card"
                   intent="none"
                   title={"Winner of the manche is ...      "+item}
                   marginBottom={10}
                   marginTop={10}
                 />
             );
           })
         }
       </Pane>
     </SideSheet>
     <Button onClick={() => this.setState({ isShown: true })}>
       Go PLay
     </Button>
   </Fragment>
   )
 }

  render() {
    return (
      <div className="App">
      <div className="App-header">
      <Tabs/>
        <p>MagicNumber </p>
        {this.contentPlay()}
      </div>
      </div>
    );
  }
}

export default MagicNumber;
