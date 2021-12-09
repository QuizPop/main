import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, updateAvatar } from "../../actions/authActions";
import axios from "axios";
// import Quiz from "../quiz/quiz"
// import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  selectAvatar = (avatarId) => {
    this.props.updateAvatar({ ...this.props.auth.user, avatarId: avatarId });
    this.setState({ ...this.state, showAvatarSelector: false });
    axios
      .put(`/api/users/${this.props.auth.user.id}/update-avatar`, {
        avatarId: avatarId,
      })
      .then((res) => {
        //   const data = res.data;
        this.props.updateAvatar({
          ...this.props.auth.user,
          avatarId: res.data.avatarId,
        });
      })
      .catch((err) => console.log(err));
  };

  state = {
    showAvatarSelector: false,
  };

  render() {
    const { user } = this.props.auth;
    // user.name.split(" ")[0]
    console.log(user);
    console.log();
    return (
      <>
        {this.state.showAvatarSelector && (
          <div className="overlay">
            <div className="avatar-selector">
              <div className="avatar-selector-header">
                <p>Select Avatar</p>
                <img
                  src="/assets/img/close.png"
                  className="close-button"
                  onClick={() =>
                    this.setState({ ...this.state, showAvatarSelector: false })
                  }
                />
              </div>
              <div className="avatar-selector-grid">
                <img
                  src="/assets/img/avatars/avatar-1.png"
                  onClick={() => this.selectAvatar(1)}
                />
                <img
                  src="/assets/img/avatars/avatar-2.png"
                  onClick={() => this.selectAvatar(2)}
                />
                <img
                  src="/assets/img/avatars/avatar-3.png"
                  onClick={() => this.selectAvatar(3)}
                />
                <img
                  src="/assets/img/avatars/avatar-4.png"
                  onClick={() => this.selectAvatar(4)}
                />
                <img
                  src="/assets/img/avatars/avatar-5.png"
                  onClick={() => this.selectAvatar(5)}
                />
                <img
                  src="/assets/img/avatars/avatar-6.png"
                  onClick={() => this.selectAvatar(6)}
                />
                <img
                  src="/assets/img/avatars/avatar-7.png"
                  onClick={() => this.selectAvatar(7)}
                />
                <img
                  src="/assets/img/avatars/avatar-8.png"
                  onClick={() => this.selectAvatar(8)}
                />
                <img
                  src="/assets/img/avatars/avatar-9.png"
                  onClick={() => this.selectAvatar(9)}
                />
                <img
                  src="/assets/img/avatars/avatar-10.png"
                  onClick={() => this.selectAvatar(10)}
                />
              </div>
            </div>
          </div>
        )}
        <div
          style={{ height: "75vh", marginTop: "4rem" }}
          className="container valign-wrapper"
        >
          <div className="row profile-card">
            {!this.props.auth.user.isPlatform && (
              <div className="score-bubble">{user.score || 0}</div>
            )}
            {!this.props.auth.user.isPlatform && (
              <img
                src={`/assets/img/avatars/avatar-${
                  this.props.auth.user.avatarId || "1"
                }.png`}
                className="avatar"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.setState({ ...this.state, showAvatarSelector: true })
                }
              />
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

              {!this.props.auth.user.isPlatform && this.props.auth.user.badges && (
                <p
                  className="flow-text grey-text text-darken-1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span className="field-label"> Badges:</span>
                  <span style={{ fontFamily: "monospace" }}></span>
                  {this.props.auth.user.badges.includes("badge-brainiac") && (
                    <img src="/assets/img/idea.png" className="badge-icon" />
                  )}
                  {this.props.auth.user.badges.includes("badge-pro") && (
                    <img src="/assets/img/badge.png" className="badge-icon" />
                  )}
                  {this.props.auth.user.badges.includes(
                    "badge-swift-finish"
                  ) && (
                    <img
                      src="/assets/img/lightning.png"
                      className="badge-icon"
                    />
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
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
export default connect(mapStateToProps, { logoutUser, updateAvatar })(
  Dashboard
);
