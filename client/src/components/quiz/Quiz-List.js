import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class quizList extends Component {
constructor(props) {
super(props);
this.state = {
Users: []
};
}


getUsersData() {
axios
.get(`/api/Quizzes`, {})
.then(res => {
const data = res.data
console.log(data)
const users = data.map(u =>
  <div>
   <p> -------------------------</p>
   <Link to="/quiz">

Name: {u.name}
</Link>
  <p>Description: {u.description}</p>
  <p>Time: {u.time_limit}</p>
  </div>
  )

  this.setState({
      users
  })

})
.catch((error) => {
  console.log(error)
})

}
componentDidMount(){
this.getUsersData()
}

render() {

  return (
    <div>
      {this.state.users}
    </div>
    )
  }
}