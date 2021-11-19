import React, {Component} from 'react';
import axios from 'axios';


export default class leaderboard extends Component {
constructor(props) {
super(props);
this.state = {
Users: []
};
}


getUsersData() {
axios
.get(`/api/users`, {})
.then(res => {
const data = res.data
console.log(data)
const users = data.map(u =>
  <div>
  <p> -------------------------</p>
  <p>Name: {u.name}</p>
  <p>Score: {u.score}</p>

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