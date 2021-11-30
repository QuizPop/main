import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Quiz from "../quiz/quiz"
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
              <b>Welcome to QuizPop!</b> 

            </h4>
            <button
              style={{

                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>

            <div className="col s6">
              <Link
                to="/myprofile"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                MyProfile
              </Link>
            </div>


            <div className="col s6">
              <Link
                to="/quizlist"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Quizzes
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/leaderboard"
                style={{
                  width: "190px",
                  borderRadius: "3px",
                  letterSpacing: "1px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Leaderboards
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/quiz-create"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Create
              </Link>

              <div className="col s6">
              <Link
                to="/platform-create"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Platform Create
              </Link>
            </div>

            </div>
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