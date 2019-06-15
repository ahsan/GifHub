import React from "react";
import { Favorite, FavoriteBorderTwoTone } from "@material-ui/icons";

class GHImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: !!props.initial
    };
  }

  toggleFavorite() {
    const nextState = !this.state.favorite;
    this.setState({favorite: nextState});
    this.props.handleIconClick(this.props.url, nextState);
  }

  render() {
    return (
      <div className="imageFrame mt-2">
        <img src={this.props.url}/>
        {
          this.props.showIcon &&
          <div className="iconRow mt-2">
          {
            !this.state.favorite ?
            <FavoriteBorderTwoTone
              className="favoriteIcon"
              onClick={e => this.toggleFavorite()}
            /> :
            <Favorite
              className="favoriteIcon"
              onClick={e => this.toggleFavorite()}
            />
          }
        </div>
        }
      </div>
    );
  }
}

export default GHImageCard;