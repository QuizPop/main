import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Quiz from "../quiz/quiz"
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    // user.name.split(" ")[0]
    console.log(user);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4 className="mb-20">
              <b>Welcome to QuizPop!</b>
            </h4>

            <div className="col s6">
              <Link
                to="/myprofile"
                style={{
                  width: "90%",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                My Profile
              </Link>
            </div>

            <div className="col s6">
              <Link
                to="/quizlist"
                style={{
                  width: "90%",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Quizzes
              </Link>
            </div>
            {!this.props.auth.user.isPlatform && (
              <div className="col s6 mt-16">
                <Link
                  to="/platform-list"
                  style={{
                    width: "90%",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Platforms List
                </Link>
              </div>
            )}
            {!this.props.auth.user.isPlatform && (
              <div className="col s6 mt-16">
                <Link
                  to="/leaderboard"
                  style={{
                    width: "90%",
                    borderRadius: "3px",
                    letterSpacing: "1px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Leaderboard
                </Link>
              </div>
            )}
            {this.props.auth.user.isPlatform && (
              <div className="col s6 mt-16">
                <Link
                  to="/quiz-create"
                  style={{
                    width: "90%",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create Quiz
                </Link>
              </div>
            )}

            {this.props.auth.user.isPlatform && (
              <div className="col s6 mt-16">
                <Link
                  to={`/platform-edit/${this.props.auth.user.platform_ID}`}
                  style={{
                    width: "90%",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Platform Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
