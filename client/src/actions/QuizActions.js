import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const Quiz_Create = (quizData, history) => dispatch => {
  console.log(quizData)
    axios
      .post("/api/Quizzes/quiz-create", quizData)
      .then(res => history.push("/dashboard")) // re-direct to dashboard after successful creation
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };