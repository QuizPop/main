import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const Quiz_Create = (quizData, history) => dispatch => {
    axios
      .post("/api/Quizzes/quiz-creation", quizData)
      .then(res => history.push("/dashboard")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };