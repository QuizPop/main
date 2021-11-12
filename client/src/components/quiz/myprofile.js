import React, { useState } from 'react';
import './index.css'



export default function Quiz() {

	const questions = [
		{
			questionText: 'Your Information',
			answerOptions: [
				{ answerText: 'Name', isCorrect: false },
				{ answerText: 'Email', isCorrect: false },
				{ answerText: 'Bio', isCorrect: true },
				{ answerText: 'Score(not decided)', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		
	};
	return (
		
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
			
		</div>
		
	);
}
