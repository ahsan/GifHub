import React from "react";

import { connect } from "react-redux";
import { setSearchString } from "../redux/actions";

import "../App.css";
import { Navbar, Form, FormControl, Nav, Button, Input } from 'react-bootstrap';


class GHNavbar extends React.Component {
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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">GifHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" 
              onChange={e => this.updateInput(e.target.value)}
              value={this.state.input}
            />
            <Button 
              variant="outline-success"
              onClick={e => this.handleSearchChange(e)}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  null,
  { setSearchString }
)(GHNavbar);
// export default GHNavbar;
