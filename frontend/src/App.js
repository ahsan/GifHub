import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import GHNavbar from "./components/GHNavbar"
import GHBody from "./components/GHBody";
import GHLogin from "./components/GHLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <GHNavbar/>
        {/* <GHBody/> */}

        <Route path="/" exact component={GHBody} />
        <Route path="/login" exact component={GHLogin} />
      </div>
    </Router>
  );
}

export default App;
