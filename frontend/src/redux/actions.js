import { SET_SEARCH_STRING, LOGIN_USER, LOGOUT_USER } from "./actionTypes";

// Search String
export const setSearchString = searchString => ({
    type: SET_SEARCH_STRING,
    payload: searchString
});

// Auth
export const loginUser = ({ email, name }) => ({
    type: LOGIN_USER,
    payload: { email, name }
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: null
});