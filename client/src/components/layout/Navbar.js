import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser, updateScore } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  async componentDidMount() {
    axios
      .get(`/api/users/${this.props.auth.user.id}/stats`)
      .then((res) => {
        this.props.updateScore({
          ...this.props.auth.user,
          score: res.data.score
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace",
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              QuizPop
            </Link>
            {/* Only show the logout button below if logged in */}
            {this.props.auth.user.id && !this.props.auth.user.isPlatform && (
              <h3
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "18px",
                  fontWeight: "700",
                  borderRadius: "50%",
                  color: "white",
                  backgroundColor: "#2ecc71",
                  position: "absolute",
                  marginTop: "1rem",
                  right: "190px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {this.props.auth.user.score}
              </h3>
            )}
            {this.props.auth.user.id && (
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  position: "absolute",
                  right: "1rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-medium waves-effect waves-light hoverable red accent-5"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser, updateScore })(
  withRouter(Navbar)
);
