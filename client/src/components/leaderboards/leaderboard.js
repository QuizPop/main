// import React, {Component} from 'react';
// import axios from 'axios';


// export default class leaderboard extends Component {
// constructor(props) {
// super(props);
// this.state = {
// Users: []
// };
// }


// getUsersData() {
// axios
// .get(`/api/users`, {})
// .then(res => {
// const data = res.data
// console.log(data)
// const users = data.map(u =>
//   <div>
//   <p> -------------------------</p>
//   <p>Name: {u.name}</p>
//   <p>Score: {u.score}</p>

//   </div>
//   )

//   this.setState({
//       users
//   })

// })
// .catch((error) => {
//   console.log(error)
// })

// }
// componentDidMount(){
// this.getUsersData()
// }

// render() {

//   return (
//     <div>
//       {this.state.users}
//     </div>
//     )
//   }
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const Leaderboard = () => {

  const [quizes, setQuizes] = useState([])
  quizes.sort((a, b) => {
    return b['score'] - a['score']
  })
  console.log(quizes)
  useEffect(() => {

    axios
      .get(`/api/users`, {})
      .then(res => {
        const data = res.data
        setQuizes(data)
      })
      .catch(err => console.log(err))

  }, [])


  return (
    <div>
      {quizes.map(quiz => (
        <div style={{border: "5px solid #008B8B" , textAlign: "center"}} key={quiz._id}>
          <p> -------------------------</p>
          <Link>

            Name: {quiz.name}
          </Link>
          <p>Score: {quiz.score}</p>

        </div>
      ))}
    </div>
  )
}

export default Leaderboard
