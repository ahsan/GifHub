import React from "react";
import { connect } from "react-redux";
import { setSearchString } from "./redux/actions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { getAuthState } from "./redux/selectors";
import "./App.css";

import GHBody from "./components/GHBody";
import GHLogin from "./components/GHLogin";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    console.log('changing input');
    this.setState({ input });
  };

  handleSearchChange() {
    console.log(this.state.input);
    this.props.setSearchString(this.state.input);
    this.setState({ input: '' });
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
                  <Nav.Link href="javascript:void(0)">Home</Nav.Link>
                </Link>
              </Nav>
              <Nav className="ml-auto">
                <Link to="/login">
                  <Nav.Link href="javascript:void(0)">
                    {
                      this.props.userLoggedIn ?
                      this.props.userName : 'Login'
                    }
                  </Nav.Link>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
  
          <Route path="/" exact component={GHBody} />
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

export default connect(
  mapStateToProps,
  { setSearchString }
)(App);
