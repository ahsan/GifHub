import React from "react";
import { connect } from "react-redux";
import { getAuthState } from "../redux/selectors";
import axios from 'axios';
import GHImageList from "./GHImageList";

class GHFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: []
    };
  }

  componentDidMount() {
    const apiUrl = `/api/user?userEmail=${this.props.userEmail}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log('User: ', response);
        try {
          this.setState({
            images: response.data.user.gifUrlList
          })
        } catch(err){
          console.log(err);
        }
      })
  }

  render() {
    return (
      <div className="Body">
        <div className="imageContainer">
          <GHImageList images={this.state.images} initial={true}/>
          {
            !this.props.userLoggedIn &&
            <span className="text">
              Please log in.     
            </span>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLoggedIn, userEmail } = getAuthState(state);
  return { userLoggedIn, userEmail };
}

export default connect(mapStateToProps)(GHFavorites);
