import { SET_SEARCH_STRING } from "../actionTypes";

const initialState = {
  searchString: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_STRING: {
      const newSearchString = action.payload;
      return {
        searchString: newSearchString
      };
    }
    default:
      return state;
  }
}
