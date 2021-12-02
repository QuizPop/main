import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/Quizzes`, {})
      .then((res) => {
        const data = res.data;
        setQuizes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="quiz-board">
      {quizes.map((quiz) => (
        <Link to={`/quiz/${quiz._id}`}>
          <div className="quiz-card" key={quiz._id}>
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
  );
};

export default QuizList;