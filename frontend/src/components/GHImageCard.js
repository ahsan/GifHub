import React from "react";
import { Favorite, FavoriteBorderTwoTone } from "@material-ui/icons";

class GHImageCard extends React.Component {
  constructor({url, showIcon}) {
    super({url, showIcon});
    this.state = {
      favorite: false
    };
  }

  toggleFavorite() {
    this.setState({
      favorite: !this.state.favorite
    });
  }

  render() {
    return (
      <div className="imageFrame mt-2">
        <img src={this.props.url}/>
        {
          this.props.showIcon &&
          <div className="iconRow mt-2">
          {
            this.state.favorite ?
            <Favorite
              className="favoriteIcon"
              onClick={e => this.toggleFavorite()}
            />:
            <FavoriteBorderTwoTone
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