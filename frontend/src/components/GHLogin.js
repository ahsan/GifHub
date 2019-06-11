import React from "react";
import { connect } from "react-redux";
import { getSearchStringState } from "../redux/selectors";
import "../App.css";

class GHLogin extends React.Component {
  constructor(props) {
    super(props);
    console.log('Props: ', props);
    // this.state = { input: "" };
  }

  render() {
    return (
      <div className="Login">
          Login
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

export default connect(mapStateToProps)(GHLogin);
// export default GHBody;
