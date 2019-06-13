import React from "react";

class GHImageCard extends React.Component {
  constructor({url}) {
    super({url});
  }

  render() {
    return (
      <div className="imageContainer">
        <img src={this.props.url}/>
      </div>
    );
  }
}

export default GHImageCard;