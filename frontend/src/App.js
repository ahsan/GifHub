import React from "react";
import { connect } from "react-redux";
import { setSearchString } from "./redux/actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { getAuthState } from "./redux/selectors";
import "./App.css";

import GHBody from "./components/GHBody";
import GHLogin from "./components/GHLogin";
import GHFavorites from "./components/GHFavorites";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">GifHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/">
                  Home
                </Link>
                {
                  this.props.userLoggedIn &&
                  <Link to="/favorites" className="ml-2">
                    Favorites
                  </Link>
                }
              </Nav>
              <Nav className="ml-auto">
                <Link to="/login">
                  {
                    this.props.userLoggedIn ?
                    this.props.userName : 'Login'
                  }
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
  
          <Route path="/" exact component={GHBody} />
          <Route path="/favorites" exact component={GHFavorites} />
          <Route path="/login" exact component={GHLogin} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const authState = getAuthState(state);
  const { userLoggedIn, userEmail, userName } = authState;
  return { userLoggedIn, userEmail, userName };
}

export default connect(mapStateToProps)(App);
