import React from 'react';
import { Route, Switch } from "react-router-dom";
import About from "./about/about";
import Login from "./signupLogin/login";
import signup from "./signupLogin/signup";
import Home from "./home/home";  

function App() {
  return (
    <div>
      <Switch>
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={signup} />
      <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
