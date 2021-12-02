import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'



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


export default function Quiz(props) {
	

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

<<<<<<< HEAD
	
	const myId = props.match.params.id

=======
	const myId = props.match.params.id 
	
>>>>>>> Score
	console.log(myId, "<===my id")


	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	//const [userScore, setUserScore] = useState();
	const [quiz, setQuiz] = useState({})
	const [answerOptions, setAnswerOptions] = useState({}) 

	
	

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < answerOptions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
		if(showScore){
			//update the users score
			console.log("send the quiz score and add it to the users score")
		}

	};

	useEffect(() => {
		axios
		.get(`/api/Quizzes/${myId}`, {})
		.then(res => {
		  const data = res.data
		  setQuiz(data)
		  setAnswerOptions(data.questions)
		})
		.catch(err => console.log(err))
	}, [])

	
	// useEffect(() => {
	// 	axios
	// 	.get(`/api/users/${myId}`, {})
	// 	.then(res => {  
	// 	  setUserScore(score)
	// 	})
	// 	.catch(err => console.log(err))

	
	// }, []) 

	console.log(answerOptions, "ans")
	if(answerOptions.length > 0){

		
	return (
		
		<div className='app'>
	
		
	
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {answerOptions&& answerOptions.length}
					
				</div>
    	
			) : (
			(
					 <>
    					
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{ answerOptions.length}
						</div> 
						 <div className='question-text'>{answerOptions[currentQuestion] && answerOptions[currentQuestion].questionText}</div>
					</div>
				 <div className='answer-section'>
				 {answerOptions[currentQuestion] && answerOptions[currentQuestion].answerOptions.map((answerOption, index) => (
							<button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div> 
				</>
				)
			)}
			
		</div>
		
	);
						}
						else{
							return <p>no answer options</p>
						}
}
