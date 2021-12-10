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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [quizes, setQuizes] = useState([]);
  quizes.sort((a, b) => {
    return b["score"] - a["score"];
  });
  console.log(quizes);
  useEffect(() => {
    axios
      .get(`/api/users`, {})
      .then((res) => {
        const data = res.data;
        setQuizes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      {quizes.map((quiz) => (
        <Link>
          <div className="leaderboard-card mb-8" key={quiz._id}>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginTop: 0,
                marginBottom: 0,
                color: "#34495e",
              }}
            >
              {quiz.name}
            </p>
            {/* <p>Score: {quiz.score}</p> */}
            {!quiz.isPlatform && quiz.badges && (
              <p
                className="flow-text grey-text text-darken-1"
                style={{ display: "flex", alignItems: "center" }}
              >
                {quiz.badges.includes("badge-brainiac") && (
                  <img src="/assets/img/idea.png" className="badge-icon" />
                )}
                {quiz.badges.includes("badge-pro") && (
                  <img src="/assets/img/badge.png" className="badge-icon" />
                )}
                {quiz.badges.includes("badge-swift-finish") && (
                  <img src="/assets/img/lightning.png" className="badge-icon" />
                )}
              </p>
            )}
            <div className="score-bubble-inline">{quiz.score || 0}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Leaderboard;
