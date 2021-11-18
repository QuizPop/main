import React, {Component} from 'react';
import axios from 'axios';


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
  <p>{u.name}</p>
  <p>{u.description}</p>
  <p>{u.platform_ID}</p>
  <p>{u.time_limit}</p>
  <p> </p>

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