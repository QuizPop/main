import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const platformCreate = (platformData, history) => dispatch => {
  console.log('platformData')

  console.log(platformData)
    axios
      .post("/api/Platforms/platform-create", platformData)
      .then(res => history.push("/dashboard")) // re-direct to dashboard after successful creation
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };