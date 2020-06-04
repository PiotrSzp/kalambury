import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import Game from "./pages/Game/Game";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={CreateRoom} />
          <Route path="/room/:id" component={Game} />
        </Switch>
      </Router>
    );
  }
}

export default App;
