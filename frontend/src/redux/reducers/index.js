import { combineReducers } from "redux";
import searchState from "./search";
import authState from "./auth";


export default combineReducers({ searchState, authState });
