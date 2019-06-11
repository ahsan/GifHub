import React from "react";
import { connect } from "react-redux";
import { getSearchStringState } from "../redux/selectors";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import "../App.css";

class GHBody extends React.Component {
  constructor(props) {
    super(props);
    console.log('Props: ', props);
    // this.state = { input: "" };
  }

  render() {
    return (
      <div className="Body">
        <Jumbotron className="m-4 px-1 p-2">
          <Container>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2 flex-auto" />
              <Button variant="outline-success" className="ml-2">Search</Button>
            </Form>
          </Container>
        </Jumbotron>
        <Jumbotron className="m-4 px-1 p-2 flex-auto">
          <Container>
            Body
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const searchState = getSearchStringState(state);
  const { searchString } = searchState;
  console.log('mstp: ', searchString);
  return { searchString };
}

export default connect(mapStateToProps)(GHBody);
// export default GHBody;
