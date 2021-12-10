import { GET_ERRORS } from "../actions/types";

const initialState = {};

// needed to give this function a name
// https://stackoverflow.com/questions/65133602/unexpected-default-export-of-anonymous-function-import-no-anonymous-default-expo
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
