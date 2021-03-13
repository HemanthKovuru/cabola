import React from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import "./scss/App.scss";
import { Route, Switch } from "react-router-dom";
import History from "./pages/History";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/notifications' component={Notification} />
        <Route exact path='/history' component={History} />
      </Switch>
    </div>
  );
};

export default App;
