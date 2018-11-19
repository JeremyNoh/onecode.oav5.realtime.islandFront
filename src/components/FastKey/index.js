import React, { Component , Fragment} from 'react';
import './App.css';
import { Alert ,Button  , toaster, SideSheet,Pane,Heading,Paragraph, Card, TextInput} from 'evergreen-ui'
// import io from 'socket.io-client';
import openSocket from 'socket.io-client';
import Tabs from '../Tabs/index.js'

class FastKey extends Component {


  constructor(props) {



  super(props);
  this.state = {
    nickname : undefined,
    time : 42000,
    start : false,
    wordToWrite : undefined,
    wordPlayer : undefined,
    finish : false,
    msgDetail : [],
    wordTry : undefined
  }
}

componentWillMount(){

    let { nickname } = this.state
    if (!(this.props.location.state == undefined)) {
      nickname = this.props.location.state.nickname.nickname
    }
    else{
      nickname = 'unknownPLayer'
    }
    this.setState({ nickname })
    // const socket = io('http://localhost:5000');
    const socket = openSocket('http://localhost:5000/fastkey');
    socket.emit("join", nickname)
    socket.on("welcome", str => {
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
  this.beginGame()
  start = !start
  this.setState({start})
}

// messageEmit = () => {
//   let { socket ,msgDetail } = this.state
//   socket.on("fastKeyMessage", str => {
//     console.log(str);
//      // this.teste(str)
//   })
// }

beginGame = () => {
  let {  socket } = this.state
  socket.on("fastKeyMessage", (word) => {
    console.log("jejej : ", word);
    this.setState({ wordToWrite :word})
  })
}

teste = (str) => {
  let { msgDetail } = this.state
  msgDetail.push(str)
  this.setState({msgDetail})
}

tryWord = () => {
  this.state.socket.emit("beginGame",this.state.wordPlayer)
  this.messageEmit()
}

beforeStart = () => {
  if (!this.state.start) {
    return(
      <Pane >
      <Heading >
       Waiting ...
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
      <Heading marginBottom= {10}> { this.state.wordToWrite}</Heading>
        <TextInput
          label="A controlled text input field"
          required
          description="This is a description."
          value={this.state.wordPlayer || ''}
          onChange={e => this.setState({ wordPlayer: e.target.value })}
        />
        <Button marginRight={16} appearance="primary" intent="success" onClick={this.tryWord}>Submit</Button>
       </Pane >
    )
  }
}
findWord = () => {
  let { wordToWrite ,socket } = this.state
  // socket.on("messageMagic", (wordToWrite) => {
  //   console.log(wordToWrite);
  //    this.setState({wordToWrite })
  // })

  socket.on("messageMagic", (word) => {
    console.log("jejej : ", word);
    this.setState({ wordToWrite : word})
  })

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
            Rules : write quickly the random word
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
          {this.findWord()}
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
      <Tabs nickname={this.state.nickname} />
        <p>FastKey </p>
        {this.contentPlay()}
      </div>
      </div>
    );
  }
}

export default FastKey;
