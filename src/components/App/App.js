import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from 'standalone/Navbar';

import { FizzBuzzPage, StatsPage } from 'routes';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/fizzbuzz">
          <FizzBuzzPage />
        </Route>
        <Route exact path="/stats">
          <StatsPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/fizzbuzz" />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
