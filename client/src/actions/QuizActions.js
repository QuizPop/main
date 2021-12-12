import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  // SET_CURRENT_USER,
  // USER_LOADING
} from "./types";

export const Quiz_Create = (quizData, history) => (dispatch) => {
  console.log(quizData);
  axios
    .post("/api/Quizzes/quiz-create", quizData)
    .then((res) => {
      console.log(res.data);
      history.push(`/quiz-edit/${res.data._id}`);
    }) // re-direct to dashboard after successful creation
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const Quiz_Update = (quizId, quizData, history) => (dispatch) => {
  axios
    .patch(`/api/Quizzes/${quizId}`, quizData)
    .then((res) => history.push("/quiz-list")) // re-direct to your own quiz list after successful update
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const Quiz_Delete = (quizId, history) => (dispatch) => {
  axios
    .delete(`/api/Quizzes/${quizId}`)
    .then((res) => history.push("/quiz-list")) // re-direct to your own quiz list after successful delete
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
