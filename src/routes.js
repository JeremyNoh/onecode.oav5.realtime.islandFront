import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import App from './components/App';
import Games from './components/Games';
import MagicNumber from './components/MagicNumber';
import Register from './components/Register';



// create my component
const MyRoute = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/magicnumber" component={MagicNumber} />
        <Route component={NotFound} />
      </Switch>
  </Router>
);

export default MyRoute;
