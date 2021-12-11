import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const QuizList = (props) => {
  const [quizes, setQuizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        props.auth.user.isPlatform
          ? `/api/Platforms/${props.auth.user.id}/Quizzes`
          : `/api/Quizzes`,
        {}
      )
      .then((res) => {
        const data = res.data;
        setQuizes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container input-field col s12">
        <input
          onChange={(e) => onChange(e)}
          value={searchQuery}
          id="search-quiz"
          type="text"
        />
        <label htmlFor="search-quiz">Search</label>
      </div>
      <div className="quiz-board">
        {quizes.map((quiz) => (
          <Link
            to={
              props.auth.user.isPlatform
                ? `/quiz-edit/${quiz._id}`
                : `/quiz/${quiz._id}`
            }
            key={quiz._id}
          >
            <div className="quiz-card" key={quiz._id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginTop: 0,
                    color: "#34495e",
                  }}
                >
                  {quiz.name}
                </p>
                {props.auth.user.isPlatform && (
                  <button
                    style={{
                      width: "60px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                    }}
                    onClick={() => {}}
                    className="btn btn-small waves-effect waves-light hoverable green accent-5"
                  >
                    Edit
                  </button>
                )}
              </div>
              <p>Description: {quiz.description}</p>
              <p className="time-label">
                <img className="timer-icon mr-2" src="/assets/img/timer.png" />{" "}
                {("0" + Math.floor(quiz.time_limit / 60)).slice(-2) +
                  ":" +
                  ("0" + Math.floor(quiz.time_limit % 60)).slice(-2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {props.auth.user.isPlatform && (
        <div className="col s6 mt-16 center-align">
          <Link
            to="/quiz-create"
            style={{
              width: "340px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Create Quiz
          </Link>
        </div>
      )}
    </>
  );
};

QuizList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(QuizList);
