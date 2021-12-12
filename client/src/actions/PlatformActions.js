import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  // SET_CURRENT_USER,
  // USER_LOADING
} from "./types";

export const Platform_Update =
  (platformId, platformData, history) => (dispatch) => {
    axios
      .patch(`/api/Platforms/${platformId}`, platformData)
      .then((res) => history.push("/dashboard")) // re-direct to dashboard after successful update
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
