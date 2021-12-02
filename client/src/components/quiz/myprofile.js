import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Quiz from "../quiz/quiz"
// import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    // user.name.split(" ")[0]
    console.log(user);
    console.log();
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row profile-card">
          {!this.props.auth.user.isPlatform && (
            <div className="score-bubble">{user.score || 0}</div>
          )}
          <div className="col s12">
            <h4>
              <b>Account Information: </b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              <span style={{ fontFamily: "monospace" }}></span>
            </p>

            <p className="flow-text grey-text text-darken-1">
              <span className="field-label">Name:</span> {user.name}
              <span style={{ fontFamily: "monospace" }}></span>
            </p>

            <p className="flow-text grey-text text-darken-1">
              <span className="field-label"> Email:</span> {user.email}
              <span style={{ fontFamily: "monospace" }}></span>
            </p>

            <p className="flow-text grey-text text-darken-1">
              <span className="field-label">Bio:</span> {user.bio}
              <span style={{ fontFamily: "monospace" }}></span>
            </p>

            <p className="flow-text grey-text text-darken-1">
              <span className="field-label">Member since:</span>{" "}
              {user.date.slice(0, 10)}
              <span style={{ fontFamily: "monospace" }}></span>
            </p>

            {!this.props.auth.user.isPlatform && (
              <p className="flow-text grey-text text-darken-1">
                <span className="field-label"> Badges:</span>
                <span style={{ fontFamily: "monospace" }}></span>
              </p>
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