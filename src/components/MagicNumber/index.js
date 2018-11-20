import React, { Component, Fragment } from "react";
import "./App.css";
import {
  Alert,
  Button,
  toaster,
  SideSheet,
  Pane,
  Heading,
  Paragraph,
  Card,
  TextInput
} from "evergreen-ui";
// import io from 'socket.io-client';
import openSocket from "socket.io-client";

import Tabs from "../Tabs/index.js";

class MagicNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: undefined,
      start: false,
      secretNumber: undefined,
      msgDetail: [],
      numberTry: 0
    };
    // React.cloneElement(this.props.children, { data: this.state.data, setData: this.updateData })
  }

  componentWillMount() {
    // const socket = io('http://localhost:5000');
    let { nickname } = this.state;
    if (!(this.props.location.state ===  undefined)) {
      nickname = this.props.location.state.nickname.nickname;
    } else {
      nickname = "unknownPLayer";
    }
    this.setState({ nickname });

    const socket = openSocket("http://localhost:5000/magic");
    socket.emit("join", nickname);
    socket.on("welcome", str => {
      toaster.success(str, {
        duration: 5
      });
    });
    this.setState({ socket });
  }

  startTheGame = () => {
    let { start, socket } = this.state;

    socket.emit("start");
    socket.on("start", () => {});
    start = !start;
    this.setState({ start });
  };

  messageEmit = () => {
    let { socket } = this.state;
    let MessageNumber = 0;
    socket.on("magicNumberMessage", str => {
      if (MessageNumber < 1) {
        this.infoForPlayer(str);
        MessageNumber++;
      }
    });
  };



  infoForPlayer = str => {
    let { msgDetail } = this.state;
    if (str.substring(0, 7) === "You win") {
      msgDetail =  []
    }
    else if (str.substring(0, 16) === "The Game is over") {
      msgDetail =  []
      this.finishTheGame()
    }
    else {
       str  = "the number is :  "+str
    }
    msgDetail.push(str);
    this.setState({ msgDetail });
  };

  finishTheGame = () => {
    let { start } = this.state
    start = !start
    this.setState({start})
    toaster.success("The Game is over , change plays or refresh ", {
      duration: 5
    });
  }

  tryNumber = () => {
    this.state.socket.emit("beginGame", this.state.numberTry);
    this.messageEmit();
  };

  beforeStart = () => {
    if (!this.state.start) {
      return (
        <Pane>
          <Heading>
            {this.state.secretNumber === undefined ? "Waiting ..." : `Find me`}
          </Heading>
          <Button
            onClick={() => this.startTheGame()}
            disabled={this.state.start}
          >
            START
          </Button>
        </Pane>
      );
    }
  };

  inputPlayerUI = () => {
    if (this.state.start) {
      return (
        <Pane>
          <Heading> Select a number beetween 0 and 1337</Heading>
          <TextInput
            label="try your number"
            required
            type="number"
            description="This is for the PLayer..."
            value={this.state.numberTry}
            onChange={e => this.setState({ numberTry: e.target.value })}
          />
          <Button
            marginRight={16}
            appearance="primary"
            intent="success"
            onClick={this.tryNumber}
          >
            Submit
          </Button>
        </Pane>
      );
    }
  };

  contentPlay = () => {
    return (
      <Fragment>
        <SideSheet
          isShown={this.state.isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          containerProps={{
            display: "flex",
            flex: "1",
            flexDirection: "column"
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
            {this.state.msgDetail.map(function(item, i) {
              return (
                <Alert
                  key={i}
                  appearance="card"
                  intent="none"
                  title={item}
                  marginBottom={10}
                  marginTop={10}
                />
              );
            })}
          </Pane>
        </SideSheet>
        <Button onClick={() => this.setState({ isShown: true })}>
          Go PLay
        </Button>
      </Fragment>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Tabs nickname={this.state.nickname} />
          <p>MagicNumber </p>
          {this.contentPlay()}
        </div>
      </div>
    );
  }
}

export default MagicNumber;
