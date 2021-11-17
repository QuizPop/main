import React, { Component } from 'react';
import axios from 'axios';


export class platfromList extends Component {
constaractor(state) {

  state = {
  locations:[]
  };
}

  componentDidMount() {
    axios.get('/api/Platforms')
    .then(({ data}) => this.setState({ locations: data })) // <-- set state
    .catch(e => console.log(e))
  }
  render() {
    const cities=this.state.locations.map(location => (
      <div key={location._id}>
     <h1>{location.name}</h1>
      <p>{location.description}</p> 
        <h1>platforms</h1>
      </div>
    ));

    return (
      <div className="Cities">
        {cities}
      </div>
    );
  }
}

export default platfromList