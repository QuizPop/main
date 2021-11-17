import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Quiz from "../quiz/quiz"
import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth; 
    // user.name.split(" ")[0]
    console.log(user)
return (

      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Account Information: </b> 
              <p className="flow-text grey-text text-darken-1">
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

              <p className="flow-text grey-text text-darken-1">
                Name:{" "}{user.name}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

              <p className="flow-text grey-text text-darken-1">
                Email:{" "}{user.email}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

              <p className="flow-text grey-text text-darken-1">
                Bio:{" "}{user.bio}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>


              <p className="flow-text grey-text text-darken-1">
                Member since: {" "}{user.date.slice(0,10)}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>


              <p className="flow-text grey-text text-darken-1">
                Score:{" "}{user.score}
                <span style={{ fontFamily: "monospace" }}></span>
              </p>

            </h4>
          </div>
        </div>
      </div>
      
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);