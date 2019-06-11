import { LOGIN_USER, LOGOUT_USER } from "../actionTypes";

const initialState = {
  userLoggedIn: false,
  userEmail: null,
  userName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      const userEmail = action.payload.email;
      const userName = action.payload.name;
      return {
        userLoggedIn: true,
        userEmail,
        userName
      };
    }
    case LOGOUT_USER: {
      return {
        userLoggedIn: false,
        userEmail: null,
        userName: null
      };
    }
    default:
      return state;
  }
}
