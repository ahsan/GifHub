import React from "react";
import { connect } from "react-redux";
import { getAuthState } from "../redux/selectors";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { loginUser, logoutUser } from "../redux/actions";
import "../App.css";

class GHLogin extends React.Component {
  constructor(props) {
    super(props);
  }

  responseGoogle = response => {
    if (response.profileObj.email) {
      const email = response.profileObj.email;
      const name = response.profileObj.name;

      console.log('Logged in: ', email);
      console.log(response.profileObj);

      this.props.loginUser({
        email,
        name  
      })
    }
  };

  logoutHandler = response => {
    console.log("Loguout");
    console.log(response);
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="Login">
        <GoogleLogin
          clientId="518612383701-2tu29utlsn3iilso25s8jdt6t1d6mkjs.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={response => this.responseGoogle(response)}
          onFailure={response => this.responseGoogle(response)}
          cookiePolicy={"single_host_origin"}
        />

        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={response => this.logoutHandler(response)}
        >
        </GoogleLogout>
      </div>
    );
  }
}

export default connect(
  null,
  { loginUser, logoutUser }
  )(GHLogin);
// export default GHBody;
