import React from "react";
import { connect } from "react-redux";
import { getSearchStringState, getAuthState } from "../redux/selectors";
import { setSearchString } from "../redux/actions";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import GHImageCard from './GHImageCard';
import GHImageList from "./GHImageList";

class GHBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: [],
      input: '',
      loading: false
    };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSearch() {
    this.props.setSearchString(this.state.input);
    this.setState({ images:[], loading: true });
    this.searchGif(this.state.input);
  }

  searchGif(searchString) {
    const randomIndex = Math.floor(Math.random()*20);
    const url = `https://api.tenor.com/v1/search?key=${process.env.REACT_APP_TENOR}&q=${searchString}&pos=${randomIndex}&pos&limit=1`;
    axios.get(url)
    .then(response => {
      console.log(response.data);
      this.setState({
        images: response.data.results.map(result => result.media[0].gif.url),
        loading: false
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleKeyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.handleSearch();
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className="Body">

        {/* Upper Half: Search Bar */}
        <Jumbotron className="m-4 px-1 p-2">
          <Container>
            <Form inline>
              <FormControl 
                type="text"
                placeholder="Search"
                className="mr-sm-2 flex-auto"
                onChange={e => this.updateInput(e.target.value)}
                value={this.state.input}
                onKeyDown={e => this.handleKeyPress(e)}
              />
              <Button
                variant="outline-success"
                className="ml-2"
                onClick={e => this.handleSearch(e)}
              >Search</Button>
            </Form>
          </Container>
        </Jumbotron>

        {/* Bottom Half */}
        <div className="imageContainer">
          <GHImageList images={this.state.images}/>
          {
            this.state.loading &&
            <span className="text">
              Loading...
            </span>
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { userLoggedIn, userEmail } = getAuthState(state);
  const { searchString } = getSearchStringState(state);
  return { userLoggedIn, userEmail, searchString };
}

export default connect(
  mapStateToProps,
  { setSearchString }
)(GHBody);
