import {
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_SCORE,
  UPDATE_AVATAR,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

// needed to give this function a name
// https://stackoverflow.com/questions/65133602/unexpected-default-export-of-anonymous-function-import-no-anonymous-default-expo
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SCORE:
      return { ...state, user: action.payload };

    case UPDATE_AVATAR:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
