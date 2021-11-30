import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const QuizList = () => {

  const [quizes, setQuizes] = useState([])

  useEffect(() => {

    axios
      .get(`/api/Quizzes`, {})
      .then(res => {
        const data = res.data
        setQuizes(data)
      })
      .catch(err => console.log(err))

  }, [])


  return (
    <div>
      {quizes.map(quiz => (
        <div style={{border: "5px solid #FFFF00" , textAlign: "center"}} key={quiz._id}>
          <p> -------------------------</p>
          <Link to={`/quiz/${quiz._id}`}>

            Name: {quiz.name}
          </Link>
          <p>Description: {quiz.description}</p>
          <p>Time: {quiz.time_limit}</p>
        </div>
      ))}
    </div>
  )
}

export default QuizList
