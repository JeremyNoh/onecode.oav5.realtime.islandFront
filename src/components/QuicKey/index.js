import React, { Component , Fragment} from 'react';
import './App.css';
import { Alert ,Button  , toaster, SideSheet,Pane,Heading,Paragraph, Card} from 'evergreen-ui'
// import io from 'socket.io-client';
import openSocket from 'socket.io-client';


import Tabs from '../Tabs/index.js'

class Register extends Component {


  constructor(props) {



  super(props);
  this.state = {
    nickname : '',
    time : 42000,
    start : false,
    secretKey : undefined,
    counterKey : 0,
    finish : false
  }
}
componentDidMount(){
  // const socket = io('http://localhost:5000');
  const socket = openSocket('http://localhost:5000');

  this.setState({socket})
  // socket.on('connect', function(){});
}


 timePLay = ()=> {
 }

  gamePlay = () => {
    let { counterKey , secretKey, finish, socket } = this.state
    console.log(finish);
    setTimeout(() =>{ this.finishGame() }, 3000);

      document.addEventListener("keypress",  (event) => {
      if (!this.state.finish) {
        if (event.key === secretKey) {
          socket.emit("addKey", (event.key))
          counterKey++
          console.log("nbr counterKey : ",counterKey);
          this.setState({ counterKey})
        }
        else {
          return null
        }
      }
      })

  }
  finishGame = () =>  {
    let {  finish  } = this.state
    finish = !finish
    this.setState({ finish  })
    console.log("finish");
    this.state.socket.emit("end" )
   toaster.success(
      'The Step is Finish',
      {
        duration: 5
      }
    )
  }

  alertFinish =() => {
    return (
      <Alert
      appearance="card"
      intent="none"
      title="Winner of the manche is ..."
      marginBottom={10}
      marginTop={10}
    />
    )
  }

  startTheGame = () => {
    this.state.socket.emit("ok")
    let { start, secretKey} = this.state
    start = !start
    this.state.socket.on("start", (key) => {
      console.log(`${key}  : is  the secret key`);
      this.setState({start , secretKey : key })
      this.gamePlay()
        });

  }

 contentPlay = () =>{
   return (
     <React.Fragment>
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
            Rules : generate a random key and you need to press a max this letter
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
         <Pane >
         <Heading >
          {this.state.start === false ?"Waiting ..." : `The letter is ${this.state.secretKey}`}
         </Heading>
           <Button onClick={() => this.startTheGame()} disabled= {this.state.start}>
             START
           </Button>
          </Pane>
         </Card>
         {this.state.finish && this.alertFinish() }
       </Pane>
     </SideSheet>
     <Button onClick={() => this.setState({ isShown: true })}>
       Go PLay
     </Button>
   </React.Fragment>
   )
 }

  render() {
    return (
      <div className="App">
      <div className="App-header">
      <p>QuickKey </p>
        {this.contentPlay()}
      </div>
      </div>
    );
  }
}

export default Register;
