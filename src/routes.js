import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import Home from './components/Home';
import NotFound from './components/NotFound';
import App from './components/App';
import Games from './components/Games';
import MagicNumber from './components/MagicNumber';
import Register from './components/Register';
import QuicKey from './components/QuicKey';
import FastKey from './components/FastKey';



// create my component
const MyRoute = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/quicKey" component={QuicKey} />
        <Route exact path="/magic" component={MagicNumber} />
        <Route exact path="/FastKey" component={FastKey} />

        <Route component={NotFound} />
      </Switch>
  </Router>
);

export default MyRoute;
