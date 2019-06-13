import React from "react";
import { connect } from "react-redux";
import { getSearchStringState } from "../redux/selectors";
import { setSearchString } from "../redux/actions";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import "../App.css";
import axios from 'axios';
import GHImageCard from './GHImageCard';

class GHBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: [],
      input: ''
    };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleSearch() {
    this.props.setSearchString(this.state.input);
    this.setState({ images:[] });
    this.searchGif(this.state.input);
  }

  searchGif(searchString) {
    const randomIndex = Math.floor(Math.random()*20);
    const url = `https://api.tenor.com/v1/search?key=${process.env.REACT_APP_TENOR}&q=${searchString}&pos=${randomIndex}&pos&limit=1`;
    axios.get(url)
    .then(response => {
      console.log(response.data);
      this.setState({
        // images: [response.data.results[0].media[0].gif.url]
        images: response.data.results.map(result => result.media[0].gif.url)
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
    console.log(this.state.images);
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
        <Jumbotron className="m-4 px-1 p-2 flex-auto">
          <Container className="mainBody">
            {
              this.state.images.length > 0 ? 
                this.state.images.map(imageUrl => <GHImageCard url={imageUrl}/>) : 
                'No Images'
            }
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

export default connect(
  mapStateToProps,
  { setSearchString }
)(GHBody);
