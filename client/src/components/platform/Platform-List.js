// import React, {Component} from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";

// export default class platformList extends Component {
// constructor(props) {
// super(props);
// this.state = {
// Users: []
// };
// }

// getUsersData() {
// axios
// .get(`/api/Platforms`, {})
// .then(res => {
// const data = res.data
// console.log(data)
// const users = data.map(u =>
//   <div>
//   <p> -------------------------</p>
//   <Link to="/dashboard">

//   Name: {u.name}
//   </Link>
//   <p>Owner ID: {u.owner_ID}</p>
//   <p>Description: {u.description}</p>
//   <p>Tags: {u.tags}</p>
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

const PlatformList = () => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/Platforms`, {})
      .then((res) => {
        const data = res.data;
        setPlatforms(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="platform-board">
      {platforms.map((platform) => (
        <Link to={`/platforms/${platform._id}`}>
          <div className="platform-card" key={platform._id}>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginTop: 0,
                color: "#34495e",
              }}
            >
              {platform.name}
            </p>
            <p>{platform.description}</p>
            <p>
              {platform.tags &&
                platform.tags.split(",").map((item) => (
                  <span
                    style={{
                      backgroundColor: "#95a5a6",
                      color: "#FFF",
                      padding: "4px 10px",
                      borderRadius: "10px",

                      marginRight: "4px",
                    }}
                  >
                    {item}
                  </span>
                ))}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PlatformList;
