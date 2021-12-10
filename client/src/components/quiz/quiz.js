import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateScore } from "../../actions/authActions";
import "./index.css";

// let div = document.createElement('div');
// div.innerHTML = '<div>Quiz closes in <p id="time">05:00</p> minutes!</div> ';
// document.body.appendChild(div);

// function startTimer(duration, display) {
// 	var timer = duration, minutes, seconds;
// 	setInterval(function () {
// 		minutes = parseInt(timer / 60, 10)
// 		seconds = parseInt(timer % 60, 10);

// 		minutes = minutes < 10 ? "0" + minutes : minutes;
// 		seconds = seconds < 10 ? "0" + seconds : seconds;

// 		document.getElementById('time').innerHTML = minutes + ":" + seconds;

// 		if (--timer < 0) {
// 			timer = duration;
// 		}
// 	}, 1000);
// }
// window.onload = function () {
// 	var fiveMinutes = 60 * 5,
// 	display = document.getElementById('time');

// 	startTimer(fiveMinutes, display);

// 	// <div className = 'time'>Quiz closes in <span id="time">05:00</span> minutes!</div>

// };

const Quiz = (props) => {
  // const questions = [
  // 	{
  // 		questionText: 'What is the capital of France?',
  // 		answerOptions: [
  // 			{ answerText: 'New York', isCorrect: false },
  // 			{ answerText: 'London', isCorrect: false },
  // 			{ answerText: 'Paris', isCorrect: true },
  // 			{ answerText: 'Dublin', isCorrect: false },
  // 		],
  // 	},
  // 	{
  // 		questionText: 'Who is CEO of Tesla?',
  // 		answerOptions: [
  // 			{ answerText: 'Jeff Bezos', isCorrect: false },
  // 			{ answerText: 'Elon Musk', isCorrect: true },
  // 			{ answerText: 'Bill Gates', isCorrect: false },
  // 			{ answerText: 'Tony Stark', isCorrect: false },
  // 		],
  // 	},
  // 	{
  // 		questionText: 'The iPhone was created by which company?',
  // 		answerOptions: [
  // 			{ answerText: 'Apple', isCorrect: true },
  // 			{ answerText: 'Intel', isCorrect: false },
  // 			{ answerText: 'Amazon', isCorrect: false },
  // 			{ answerText: 'Microsoft', isCorrect: false },
  // 		],
  // 	},
  // 	{
  // 		questionText: 'How many Harry Potter books are there?',
  // 		answerOptions: [
  // 			{ answerText: '1', isCorrect: false },
  // 			{ answerText: '4', isCorrect: false },
  // 			{ answerText: '6', isCorrect: false },
  // 			{ answerText: '7', isCorrect: true },
  // 		],
  // 	},
  // ];

  const myId = props.match.params.id;

  console.log(myId, "<===my id");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [badges, setBadges] = useState([]);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [answerOptions, setAnswerOptions] = useState({});

  //Timer
  const [quizStarted, setQuizStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const handleAnswerOptionClick = (isCorrect) => {
    //Calculate updated score before calling setScore() as state might not be set immediately, as it is asynchronous and reading score value inside updateScore might return incorrect value
    const updatedScore = isCorrect ? score + 1 : score;

    setScore(updatedScore);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < answerOptions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setTimerEnded(true);
      setShowScore(true);
      updateScore(updatedScore);
    }
  };

  const updateScore = (pointsScored) => {
    const badges = props.auth.user.badges || [];
    if (currentTime > 0 && !badges.includes("badge-swift-finish")) {
      badges.push("badge-swift-finish");
    }
    if (
      props.auth.user.score + pointsScored > 20 &&
      !badges.includes("badge-brainiac")
    ) {
      badges.push("badge-brainiac");
    }
    if (
      props.auth.user.score + pointsScored > 50 &&
      !badges.includes("badge-pro")
    ) {
      badges.push("badge-pro");
    }
    axios
      .put(`/api/users/${props.auth.user.id}/update-score`, {
        pointsScored: pointsScored,
        badgesEarned: badges,
      })
      .then((res) => {
        //   const data = res.data;
        props.updateScore({ ...props.auth.user, score: res.data.score });
      })
      .catch((err) => console.log(err));
    //update the users score
    console.log("send the quiz score and add it to the users score");
  };

  useEffect(() => {
    axios
      .get(`/api/Quizzes/${myId}`, {})
      .then((res) => {
        const data = res.data;
        setQuiz(data);
        setCurrentTime(data.time_limit);
        setAnswerOptions(data.questions);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (quizStarted && !timerEnded) {
      const timerHandle = setTimeout(() => {
        const updatedTime = +currentTime - 1;

        if (updatedTime > -1) {
          setCurrentTime(updatedTime);
        } else {
          setTimerEnded(true);
          setShowScore(true);
          updateScore(score);
        }
      }, 1000);
    }
  }, [quizStarted, currentTime, timerEnded]);

  console.log(answerOptions, "ans");
  if (answerOptions.length > 0) {
    return (
      <>
        <h2
          style={{ fontWeight: "bold", fontSize: "38px", textAlign: "center" }}
        >
          {("0" + Math.floor(currentTime / 60)).slice(-2) +
            ":" +
            ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </h2>
        <div className="question-card">
          {!quizStarted && (
            <div className="start-quiz">
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={() => setQuizStarted(true)}
                className="btn btn-medium waves-effect waves-light hoverable green accent-5"
              >
                Start Quiz
              </button>
            </div>
          )}
          {showScore ? (
            <div className="score-section">
              You scored {score} out of {answerOptions && answerOptions.length}
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/
                  {answerOptions.length}
                </div>
                <div className="question-text">
                  {answerOptions[currentQuestion] &&
                    answerOptions[currentQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                {answerOptions[currentQuestion] &&
                  answerOptions[currentQuestion].answerOptions.map(
                    (answerOption, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect)
                        }
                        className="mt-4 p-4"
                      >
                        {answerOption.answerText}
                      </button>
                    )
                  )}
              </div>
            </>
          )}
        </div>
      </>
    );
  } else {
    return <p>no answer options</p>;
  }
};

Quiz.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { updateScore })(Quiz);
