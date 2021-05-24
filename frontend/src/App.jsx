import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Logout from "./components/Logout";


class App extends Component {
  render() {
    return (
      <Router>
        
        <div className="App">
          <Route path="/" exact component={Home} />
           
          
          <Route path="/login"  component={Login} />

          <Route path="/register"  component={Register} />
          <Route path="/logout"  component={Logout} />


        </div>
      </Router>
    );
  }
}
export default App;
