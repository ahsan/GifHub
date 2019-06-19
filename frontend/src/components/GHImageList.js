import React from "react";
import { connect } from "react-redux";
import GHImageCard from './GHImageCard';
import { getAuthState } from "../redux/selectors";
import axios from 'axios';

class GHImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  handleIconClick(url, liked) {
    console.log(`The user ${this.props.userEmail} liked the image ${url} : ${liked}`);
    const apiUrl = `/api/user/gif`;
    const body = {
      "userEmail": this.props.userEmail,
      "gifUrl": url
    };
    if(liked) {
      axios
        .put(apiUrl, body)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    } else {
      axios
        .delete(apiUrl, {data: body})
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }
  }

  render() {
    return <div className="imageList mb-2">
      {
        this.props.images.map(imageUrl =>
          <GHImageCard 
            url={imageUrl}
            showIcon={this.props.userLoggedIn}
            handleIconClick={this.handleIconClick.bind(this)}
            initial={this.props.initial}
          />
        )
      }
    </div>
  }
};

const mapStateToProps = state => {
  const { userLoggedIn, userEmail } = getAuthState(state);
  return { userLoggedIn, userEmail };
}

export default connect(mapStateToProps)(GHImageList);
