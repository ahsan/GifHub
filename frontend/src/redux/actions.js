import { SET_SEARCH_STRING } from "./actionTypes";

export const setSearchString = searchString => ({
    type: SET_SEARCH_STRING,
    payload: searchString
});
